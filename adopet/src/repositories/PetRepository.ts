import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/interfacePetRepository";

export default class PetRepository implements InterfacePetRepository {
  private repository: Repository<PetEntity>;

  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
  }

  criaPet(pet: PetEntity): void {
    this.repository.save(pet);
  }
  async listaPet(): Promise<Array<PetEntity>> {
    return await this.repository.find();
  }
  async atualizaPet(
    id: number,
    newData: PetEntity,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const petToUpdate = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (!petToUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }

      Object.assign(petToUpdate, newData);

      this.repository.save(petToUpdate);
      return { success: true };
    } catch (error) {
      throw error;
    }
    // return await this.repository.update(pet, { id: id });
  }
  async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const petToDelete = await this.repository.findOne({
        where: {
          id,
        },
      });

      if (!petToDelete) {
        return {
          success: false,
          message: "Pet não encontrado!",
        };
      }

      await this.repository.remove(petToDelete);

      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}
