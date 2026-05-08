import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/interfaceAdotanteRepository";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async listaAdotante(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }

  async atualizaAdotante(
    id: number,
    adotante: AdotanteEntity,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });

      if (!adotanteToUpdate) {
        return { success: false, message: "Adotante não encontrado" };
      }

      Object.assign(adotanteToUpdate, adotante);

      await this.repository.save(adotanteToUpdate);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async deletaAdotante(
    id: number,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToDelete = await this.repository.find({ where: { id } });

      if (!adotanteToDelete) {
        return { success: false, message: "Adotante não encontrado" };
      }

      await this.repository.remove(adotanteToDelete);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<AdotanteEntity> {
    return await this.repository.save(adotante);
  }
}
