import { AppDataSource } from "./config/dataSource";
import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
