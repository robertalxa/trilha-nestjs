import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(req: Request, res: Response) {
    try {
      const { celular, endereco, foto, nome, senha } = req.body;

      const novoAdotante = new AdotanteEntity(
        nome,
        senha,
        celular,
        foto,
        endereco,
      );

      await this.repository.criaAdotante(novoAdotante);

      return res.status(200).json(novoAdotante);
    } catch (error) {
      return res.send(400).json({
        error,
      });
    }
  }
}
