
import { createServer } from "http";
import dotenv from "dotenv";

import connection from "./database/connection";
import {app} from "./app";
dotenv.config();

const port = process.env.PORT || 8080;

const start = async (): Promise<void> => {
  try {
    await connection.sync({ force: true });
    createServer(app).listen(port, () => {
      console.log(`[server]: App listening on port ${port}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1);
  }
};

void start();