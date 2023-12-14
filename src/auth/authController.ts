import bcrypt, { genSaltSync } from "bcryptjs"
import jwt, { Secret } from "jsonwebtoken"
import { Repository } from "sequelize-typescript";

import connection from "../database/connection"
import { User, UserFormAttributes } from "../users/User"
import { Auth, AuthForm, AuthFormAttributes } from "./Auth";

interface ResponseAttributes {
  code: number
  data: string | User | Auth | unknown
  message?: string
}

const JWT_SECRET: Secret = process.env.JWT_SECRET || genSaltSync();

export async function createToken (
  authRepository: Repository<Auth>,
  kwargs: AuthFormAttributes
): Promise<ResponseAttributes> {
  const transaction = await connection.transaction();
  let _expired_at = new Date();
    _expired_at.setSeconds(
      _expired_at.getSeconds() +
      Number(process.env.JWT_REFRESH_EXPIRATION) || 864000 //
    );
  try {
    const { user_id, token } = kwargs;
    const refresh_token = await authRepository.create({
      token,
      user_id,
      expiry_date: new Date(_expired_at.getTime()),
    }, {
      raw: true,
      returning: true,
      transaction,
    });

    await transaction.commit();
    return {
      code: 200,
      data: refresh_token.token
    }
  } catch (err: any) {
    console.error(err);
    await transaction.rollback();
    return {
      code: 500,
      message: 'Error in creation token.',
      data: err.toString()
    }
  }
}

export async function registerUser (
  userRepository: Repository<User>,
  kwargs: UserFormAttributes
): Promise<ResponseAttributes> {
  const transaction = await connection.transaction();
  try {
    const { username, password } = kwargs;
    const user_exists = await userRepository.findOne({ where: { username }});
    if (user_exists) {
      return {
        code: 400,
        data: 'Username is already associated with an account.'
      }
    }

    const user_register = await userRepository.create({
      username,
      hashed_password: await bcrypt.hash(password, 15)
    }, {
      raw: true,
      returning: true,
      transaction
    });

    await transaction.commit();
    return {
      code: 200,
      data: user_register
    }
  } catch (err) {
    await transaction.rollback();
    return {
      code: 500,
      message: 'Error in registering user.',
      data: err
    }
  }
}

export async function signInUser (
  userRepository: Repository<User>,
  authRepository: Repository<Auth>,
  kwargs: UserFormAttributes
): Promise<ResponseAttributes> {
  try {
    const { username, password } = kwargs;
    const user_sign = await userRepository.findOne({ where: { username }});
    if (!user_sign) {
      return {
        code: 404,
        message: 'Username not found!.',
        data: null
      }
    }

    const _password_valid = await bcrypt.compare(password, user_sign.hashed_password);
    if (!_password_valid) {
      return {
        code: 403,
        message: 'Incorrect username and password combination.',
        data: null
      }
    }

    const token = jwt.sign({ id: user_sign.id },
      JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );

    const refresh_token = await createToken(authRepository, {
      user_id: user_sign.id,
      token
    });

    return Object.assign({ code: 200, data: null }, {
      data: {
        ...user_sign,
        token,
        refresh_token
      }
    });
  } catch (err: any) {
    return {
      code: 500,
      message: 'Sign in error.',
      data: err.toString()
    }
  }
}

export function verifyExpiration (
  kwargs: Pick<AuthForm, "expiry_date">
) {
  try {
    const { expiry_date } = kwargs;
    const response = Number(expiry_date.getTime()) < Number(new Date().getTime())
    return {
      code: 200,
      data: response
    }
  } catch (err: any) {
    throw err;
  }
}

export async function refreshToken (
  authRepository: Repository<Auth>,
  userRepository: Repository<User>,
  kwargs: Pick<AuthFormAttributes, "refresh_token">
) {
  const transaction = await connection.transaction();
  const { refresh_token: requestToken } = kwargs;
  if (!requestToken || requestToken == null) {
    return {
      code: 403,
      message: 'Refresh Token is required.',
      data: null
    }
  }

  try {
    let refresh_token = await authRepository.findOne({ where: { token: requestToken }});
    if (!refresh_token) {
      return {
        code: 403,
        message: 'Invalid refresh token!.',
        data: null
      }
    }

    const verifyExpToken = verifyExpiration({ expiry_date: refresh_token.expiry_date });
    if (verifyExpToken && verifyExpToken.data) {
      await authRepository.destroy({
        where: { id: refresh_token.id},
        transaction,
      });
      await transaction.commit();
      return {
        code: 403,
        message: 'Refresh token was expired. Please make a new sign in request.',
        data: null,
      }
    }

    const user_response = await userRepository.findOne({
      where: { id: refresh_token.user_id },
      attributes: {
        exclude: ["hashed_password"]
      }
    });
    if (!user_response || user_response == null) {
      return {
        code: 404,
        message: 'User not found.',
        data: user_response
      }
    }

    const access_token = jwt.sign({ id: user_response.id },
      JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );

    return {
      code: 200,
      data: {
        access_token,
        refresh_token: refresh_token.token
      }
    }
  } catch (err: any) {
    console.warn(err);
    return {
      code: 500,
      message: 'Internal server error.',
      data: err.toString()
    }
  }
}
