import { Request, Response } from "express";
import { EnumEspecie } from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import { EnumPorte } from "../enum/EnumPorte";
import {
  TipoRequestBodyPet,
  TipoRequestParamsPet,
  TipoResponseBodyPet,
} from "../tipos/tiposPet";

export default class PetController {
  constructor(private repository: PetRepository) {}

  criaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { adotado, nome, especie, porte, dataDeNascimento } = <PetEntity>(
      req.body
    );

    const novoPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
      porte,
    );
    this.repository.criaPet(novoPet);
    return res
      .status(201)
      .send({ dados: { id: novoPet.id, nome, especie, porte } });
  }

  async listaPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const listaDePetss = await this.repository.listaPet();
    const dados = listaDePetss.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte || undefined,
      };
    });
    return res.status(200).json({ dados });
  }

  async atualizaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { id } = req.params;
    const { adotado, especie, porte, dataDeNascimento, nome } =
      req.body as PetEntity;

    const pet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);

    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      pet,
    );

    if (!success) {
      return res.status(404).json({ erros: message });
    }

    return res.status(204);
  }

  async deletaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ erros: message });
    }

    return res.status(204);
  }

  async adotaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { pet_id, adotante_id } = req.params;

    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id),
    );

    if (!success) {
      return res.status(404).json({ erros: message });
    }
    return res.sendStatus(204);
  }

  async buscaPetPorCampoGenerico(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { campo, valor } = req.query;

    const listaPets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string,
    );

    const dados = listaPets.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte,
      };
    });
    return res.status(200).json({ dados });
  }
}
