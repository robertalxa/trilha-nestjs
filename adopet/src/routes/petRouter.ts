import express from "express";
import PetController from "../controller/PetController";

const router = express.Router();

const petController = new PetController();

router.post("/", petController.criaPet);
router.get("/", petController.listaPets);
router.put("/:id", petController.atualizaPet);

export default router;
