import express, { RequestHandler } from "express";
import AdotanteController from "../controller/AdotanteController";
import { AppDataSource } from "../config/dataSource";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";

const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity"),
);

const router = express.Router();
const adotanteController = new AdotanteController(adotanteRepository);

const validateBody: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyAdotante(req, res, next);

router.post("/", validateBody, (req, res) =>
  adotanteController.criaAdotante(req, res),
);
router.get("/", (req, res) => adotanteController.listaAdotante(req, res));
router.put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", (req, res) =>
  adotanteController.deletaAdotante(req, res),
);
router.patch("/:id", (req, res) =>
  adotanteController.atualizaEndereco(req, res),
);

export default router;
