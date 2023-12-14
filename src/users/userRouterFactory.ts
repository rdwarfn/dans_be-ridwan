import { Router } from "express";
import { Repository } from "sequelize-typescript";

import { User } from "./User";
import { Auth } from "../auth/Auth";

export const userRouterFactory = (
  userRepository: Repository<User>,
  authRepository: Repository<Auth>,
) => Router()

  .get("/users", (req, res, next) =>
    userRepository.findAll({
      include: [authRepository],
      raw: true
    })
      .then(ress => res.json(ress))
      .catch(next)
    )

  .get("/users/:id", (req, res, next) =>
    userRepository.findByPk(req.params.id)
      .then(ress => res.json(ress))
      .catch(next)
    )

  .post("/users", (req, res, next) =>
    userRepository.create(req.body, {
      raw: true,
      returning: true,
    })
      .then(ress => res.json(ress))
      .catch(next)
    )
