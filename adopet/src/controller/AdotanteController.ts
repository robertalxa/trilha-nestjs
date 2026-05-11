import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
} from "../tipos/tipoAdotante";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const { celular, endereco, foto, nome, senha } = req.body;

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco,
    );

    await this.repository.criaAdotante(novoAdotante);

    return res
      .status(200)
      .json({ data: { id: novoAdotante.id, nome, celular } });
  }

  async listaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const listaAdotantes = await this.repository.listaAdotante();
    const data = listaAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
      };
    });
    return res.status(200).json({ data });
  }

  async atualizaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
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
        error: message,
      });
    }

    return res.status(200).json({ data: adotanteToUpdate });
  }

  async deletaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id),
    );

    if (!success) {
      return res.status(404).json({
        error: message,
      });
    }

    return res.status(200);
  }

  async atualizaEndereco(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaEnderecoAdotante(
      Number(id),
      req.body.endereco as EnderecoEntity,
    );

    if (!success) {
      return res.status(404).json({
        error: message,
      });
    }

    return res.status(200);
  }
}
