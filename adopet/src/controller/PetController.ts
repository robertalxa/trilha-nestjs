import { Request, Response } from "express";
import { TipoPet } from "../tipos/TipoPet";
import { EnumEspecie } from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import { EnumPorte } from "../enum/EnumPorte";

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}
let listaDePets: TipoPet[] = [];

export default class PetController {
  constructor(private repository: PetRepository) {}

  criaPet(req: Request, res: Response) {
    const { adotado, nome, especie, porte, dataDeNascimento } = <PetEntity>(
      req.body
    );
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ error: "Espécie não encontrada" });
    }
    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ error: "Porte não encontrada" });
    }
    const novoPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
      porte,
    );
    this.repository.criaPet(novoPet);
    return res.status(201).send(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePetss = await this.repository.listaPet();
    return res.status(200).json(listaDePetss);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, porte, dataDeNascimento, nome } =
      req.body as PetEntity;

    const pet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);

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

  async adotaPet(req: Request, res: Response) {
    const { pet_id, adotante_id } = req.params;

    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id),
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async buscaPetPeloPorte(req: Request, res: Response) {
    const { porte } = req.query;

    const listaPets = await this.repository.buscaPetPeloPorte(
      porte as EnumPorte,
    );

    return res.status(200).json(listaPets);
    
  }
}
