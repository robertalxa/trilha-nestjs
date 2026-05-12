import express from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { AppDataSource } from "../config/dataSource";
import AbrigoController from "../controller/AbrigoController";
import { middlewareValidadorBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";
const abrigoDataSource = new AbrigoRepository(
  AppDataSource.getRepository("AbrigoEntity"),
);

const router = express.Router();
const abrigoController = new AbrigoController(abrigoDataSource);

router.post("/", middlewareValidadorBodyAbrigo, (req, res) =>
  abrigoController.criaAbrigo(req, res),
);

export default router;
