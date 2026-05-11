import PetEntity from "../../entities/PetEntity";
import { EnumPorte } from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPet(): PetEntity[] | Promise<Array<PetEntity>>;
  atualizaPet(
    id: number,
    pet: PetEntity,
  ): void | Promise<{ success: boolean; message?: string }>;
  deletaPet(id: number): void | Promise<{ success: boolean; message?: string }>;
  buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo],
  ): Promise<PetEntity[]> | PetEntity[];
}
