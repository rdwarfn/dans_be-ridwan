import { Op } from "sequelize"
import { SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const operatorsAliases = {
  $like: Op.like,
  $iLike: Op.iLike,
}

export const development: SequelizeOptions = {
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  dialect: "postgres",
  logging: console.log,
  dialectOptions: {
    ssl: false
  },
  operatorsAliases
};

export const production: SequelizeOptions = {
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  dialect: "postgres",
  ssl: true,
  operatorsAliases
}

export const test: SequelizeOptions = {
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  dialect: "postgres",
  operatorsAliases
}
