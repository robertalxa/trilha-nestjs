import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): Promise<AdotanteEntity>;
}
