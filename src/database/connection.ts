import { Sequelize } from "sequelize-typescript";
import { User } from "../users/User";
import { Auth } from "../auth/Auth";
import { Job } from "../job/Job";
import dotenv from "dotenv";
import * as config from "./config";
dotenv.config();

const option_env = "development";

export default new Sequelize(Object.assign({
  models: [User, Auth, Job],
  repositoryMode: true,
},
  config[option_env]
));
