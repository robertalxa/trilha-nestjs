import express from "express";
import petRouter from "./petRouter";
import adotanteRouter from "./adotanteRouter";
import abrigosRouter from "./abrigosRouter";

const router = (app: express.Router) => {
  app.use("/pets", petRouter);
  app.use("/adotantes", adotanteRouter);
  app.use("/abrigos", abrigosRouter);
};

export default router;
