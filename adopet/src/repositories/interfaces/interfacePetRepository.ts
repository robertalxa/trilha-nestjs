import PetEntity from "../../entities/PetEntity";
import { EnumPorte } from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPet(): PetEntity[] | Promise<Array<PetEntity>>;
  atualizaPet(id: number, pet: PetEntity): void;
  deletaPet(id: number): void;
  adotaPet(idPet: number, idAdotante: number): void;
  buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo],
  ): Promise<PetEntity[]> | PetEntity[];
}
