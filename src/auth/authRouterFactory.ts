import { Router } from "express";
import { Auth } from "./Auth";
import { User } from "../users/User";
import { Repository } from "sequelize-typescript";

import dotenv from "dotenv";
import { createToken, refreshToken, registerUser, signInUser } from "./authController";
dotenv.config();

export const authRouterFactory = (
  authRepository: Repository<Auth>,
  userRepository: Repository<User>,
) => Router()

  .post('/create-token', (req, res, next) =>
    createToken(authRepository, req.body)
      .then(ress => {
        res.status(ress.code).json(ress.data)
      })
      .catch(next)
    )

  .post('/sign-up', async (req, res, next) =>
    registerUser(userRepository, req.body)
      .then(ress => {
        res.status(ress.code).json(ress.data)
      })
      .catch(next)
    )

  .post('/sign-in', async (req, res, next) =>
    signInUser(userRepository, authRepository, req.body)
      .then(ress => {
        res.status(ress.code).json(ress.data)
      })
      .catch(next)
    )

  .post('/refresh-token', (req, res, next) =>
    refreshToken(authRepository, userRepository, req.body)
      .then(ress => {
        res.status(ress.code).json(ress.data);
      })
      .catch(next)
    )