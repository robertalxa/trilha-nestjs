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
    const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
    this.repository.criaPet(novoPet);
    return res.status(201).send(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePetss = await this.repository.listaPet();
    return res.status(200).json(listaDePetss);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, dataDeNascimento, nome } = req.body as TipoPet;

    const pet = new PetEntity(nome, especie, dataDeNascimento, adotado);

    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      pet,
    );

    if (!success) {
      return res.status(404).json({ erro: message });
    }

    return res.status(200).json(pet);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ erro: message });
    }

    return res.status(200).json({
      mensagem: "Pet deletado com sucesso!",
    });
  }
}
