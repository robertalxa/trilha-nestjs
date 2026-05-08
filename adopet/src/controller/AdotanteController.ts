import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(req: Request, res: Response) {
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
  }

  async listaAdotante(req: Request, res: Response) {
    const listaAdotantes = await this.repository.listaAdotante();
    return res.status(200).json(listaAdotantes);
  }

  async atualizaAdotante(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, celular, senha, foto, endereco } = req.body;

    const adotanteToUpdate = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco,
    );

    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      adotanteToUpdate,
    );

    if (!success) {
      return res.status(404).json({
        erro: message,
      });
    }

    return res.status(200).json(adotanteToUpdate);
  }

  async deletaAdotante(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id),
    );

    if (!success) {
      return res.status(404).json({
        erro: message,
      });
    }

    return res.status(200).json({
      mensagem: "Adotante deletado com sucesso",
    });
  }
}
