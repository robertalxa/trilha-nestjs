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

  listaPets(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, idade, nome } = req.body as TipoPet;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }

    pet.nome = nome;
    pet.idade = idade;
    pet.especie = especie;
    pet.adotado = adotado;
    return res.status(200).json(pet);
  }
}
