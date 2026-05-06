import { Request, Response } from "express";
import { TipoPet } from "../tipos/tipoPet";

let listaDePets: TipoPet[] = [];

export default class PetController {
  criaPet(req: Request, res: Response) {
    const { id, adotado, nome, especie, idade } = <TipoPet>req.body;
    const novoPet = { id, adotado, nome, especie, idade };
    listaDePets.push(novoPet);
    return res.status(201).send(novoPet);
  }
}
