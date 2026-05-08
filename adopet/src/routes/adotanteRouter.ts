import express from "express";
import AdotanteController from "../controller/AdotanteController";
import { AppDataSource } from "../config/dataSource";
import AdotanteRepository from "../repositories/AdotanteRepository";

const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity"),
);

const router = express.Router();
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req, res) => adotanteController.criaAdotante(req, res));
router.get("/", (req, res) => adotanteController.listaAdotante(req, res));
router.put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", (req, res) =>
  adotanteController.deletaAdotante(req, res),
);
router.patch("/:id", (req, res) =>
  adotanteController.atualizaEndereco(req, res),
);

export default router;
