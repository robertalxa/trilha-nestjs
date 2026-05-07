import { Request, Response } from "express";
import { TipoPet } from "../tipos/TipoPet";
import { EnumEspecie } from "../enum/EnumEspecie";
import PetRepository from "../repositories/interfaces/PetRepository";
import PetEntity from "../entities/PetEntity";

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}
let listaDePets: TipoPet[] = [];

export default class PetController {
  constructor(private repository: PetRepository) {}

  criaPet(req: Request, res: Response) {
    const { adotado, nome, especie, dataDeNascimento } = <PetEntity>req.body;
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ error: "Espécie não encontrada" });
    }
    const novoPet = new PetEntity();
    ((novoPet.id = geraId()),
      (novoPet.adotado = adotado),
      (novoPet.nome = nome),
      (novoPet.especie = especie),
      (novoPet.dataDeNascimento = dataDeNascimento));
    this.repository.criaPet(novoPet);
    return res.status(201).send(novoPet);
  }

  listaPets(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, dataDeNascimento, nome } = req.body as TipoPet;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }

    pet.nome = nome;
    pet.dataDeNascimento = dataDeNascimento;
    pet.especie = especie;
    pet.adotado = adotado;
    return res.status(200).json(pet);
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }
    const index = listaDePets.indexOf(pet);
    listaDePets.splice(index, 1);
    return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
  }
}
