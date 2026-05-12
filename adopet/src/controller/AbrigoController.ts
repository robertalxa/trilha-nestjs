import { Request, Response } from "express";
import {
  TipoRequestBodyAbrigo,
  TipoRequestParamsAbrigo,
  TipoResponseBodyAbrigo,
} from "../tipos/tiposAbrigo";
import AbrigoEntity from "../entities/AbrigoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {}

  async criaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    const { nome, celular, email, senha } = req.body;
    const abrigo = new AbrigoEntity(nome, email, senha, celular);
    await this.repository.criaAbrigo(abrigo);
    res.sendStatus(200);
  }
  async listaAbrigos(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    res.sendStatus(404);
  }
  async atualizaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    res.sendStatus(404);
  }
  async deletaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    res.sendStatus(404);
  }
  async atualizaEnderecoAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    res.sendStatus(404);
  }
}
