import { Request, Response } from "express";
import * as yup from "yup";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
} from "../tipos/tiposAdotante";

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
      .json({ dados: { id: novoAdotante.id, nome, celular, endereco } });
  }

  async listaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const listaAdotantes = await this.repository.listaAdotante();
    const dados = listaAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        endereco: adotante.endereco || undefined,
      };
    });
    return res.status(200).json({ dados });
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
        erros: message,
      });
    }

    return res.status(204);
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
        erros: message,
      });
    }

    return res.status(200);
  }

  async atualizaEndereco(
    req: Request<TipoRequestParamsAdotante, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaEnderecoAdotante(
      Number(id),
      req.body,
    );

    if (!success) {
      return res.status(404).json({
        erros: { message },
      });
    }

    return res.sendStatus(204);
  }
}
