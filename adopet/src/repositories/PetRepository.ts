import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/interfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import { EnumPorte } from "../enum/EnumPorte";
import { NaoEncontrado } from "../utils/manipulaErros";

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
  async atualizaPet(id: number, newData: PetEntity) {
    console.log("Entrou na funcao");
    const petToUpdate = await this.petRepository.findOne({
      where: {
        id,
      },
    });
    if (!petToUpdate) {
      throw new NaoEncontrado("Pet não encontrado");
    }

    Object.assign(petToUpdate, newData);

    this.petRepository.save(petToUpdate);
  }
  async deletaPet(id: number) {
    const petToDelete = await this.petRepository.findOne({
      where: {
        id,
      },
    });

    if (!petToDelete) {
      throw new NaoEncontrado("Pet não encontrado");
    }

    await this.petRepository.remove(petToDelete);
  }

  async adotaPet(idPet: number, idAdotante: number) {
    const pet = await this.petRepository.findOne({ where: { id: idPet } });
    if (!pet) {
      throw new NaoEncontrado("Pet não encontrado");
    }

    const adotante = await this.adotanteRepository.findOne({
      where: { id: idAdotante },
    });
    if (!adotante) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    pet.adotante = adotante;
    pet.adotado = true;
    await this.petRepository.save(pet);
  }

  async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo],
  ): Promise<PetEntity[]> {
    const pets = await this.petRepository.find({ where: { [campo]: valor } });

    return pets;
  }
}
