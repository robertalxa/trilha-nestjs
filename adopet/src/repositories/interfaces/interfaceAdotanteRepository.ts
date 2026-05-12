import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): Promise<void>;
  listaAdotante(): Promise<AdotanteEntity[]>;
  atualizaAdotante(id: number, adotante: AdotanteEntity): void;
  deletaAdotante(id: number): void;
  atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): void;
}
