import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPet(): PetEntity[] | Promise<Array<PetEntity>>;
  atualizaPet(id: number, pet: PetEntity): void;
  deletaPet(id: number, pet: PetEntity): void;
}
