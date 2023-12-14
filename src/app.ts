import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import paginate from "express-paginate";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from "../swagger";
import { json } from "body-parser";

import connection from "./database/connection";
import { authRouterFactory } from "./auth/authRouterFactory";
import { userRouterFactory } from "./users/userRouterFactory";
import { jobRouterFactory } from "./job/jobRouterFactory";
import { User } from "./users/User";
import { Auth } from "./auth/Auth";
import { Job } from "./job/Job";

export const app: Express = express();
const authRepository = connection.getRepository(Auth);
const userRepository = connection.getRepository(User);
const jobRepository = connection.getRepository(Job);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(paginate.middleware(10, 100))

// enable corse for all origins
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

  next();
});

app.use(json({ limit: '5mb' }));
app.use("/api/v1/auth", authRouterFactory(authRepository, userRepository));
app.use("/api/v1/users", userRouterFactory(userRepository, authRepository));
app.use("/api/v1/jobs", jobRouterFactory(jobRepository));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/", (req, res) => {
  res.redirect("/docs");
});
