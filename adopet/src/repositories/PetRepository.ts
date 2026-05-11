import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/interfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import { EnumPorte } from "../enum/EnumPorte";

export default class PetRepository implements InterfacePetRepository {
  private petRepository: Repository<PetEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;

  constructor(
    petRepository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>,
  ) {
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository;
  }

  criaPet(pet: PetEntity): void {
    this.petRepository.save(pet);
  }
  async listaPet(): Promise<Array<PetEntity>> {
    return await this.petRepository.find();
  }
  async atualizaPet(
    id: number,
    newData: PetEntity,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const petToUpdate = await this.petRepository.findOne({
        where: {
          id,
        },
      });
      if (!petToUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }

      Object.assign(petToUpdate, newData);

      this.petRepository.save(petToUpdate);
      return { success: true };
    } catch (error) {
      throw error;
    }
    // return await this.petRepository.update(pet, { id: id });
  }
  async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const petToDelete = await this.petRepository.findOne({
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

      await this.petRepository.remove(petToDelete);

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async adotaPet(
    idPet: number,
    idAdotante: number,
  ): Promise<{ success: boolean; message?: string }> {
    const pet = await this.petRepository.findOne({ where: { id: idPet } });
    if (!pet) {
      return { success: false, message: "Pet não encontrado" };
    }

    const adotante = await this.adotanteRepository.findOne({
      where: { id: idAdotante },
    });
    if (!adotante) {
      return { success: false, message: "Adotante não encontrado" };
    }

    pet.adotante = adotante;
    pet.adotado = true;
    await this.petRepository.save(pet);
    return { success: true };
  }

  async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo],
  ): Promise<PetEntity[]> {
    const pets = await this.petRepository.find({ where: { [campo]: valor } });

    return pets;
  }
}
