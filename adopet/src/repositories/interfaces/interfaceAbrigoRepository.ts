import AbrigoEntity from "../../entities/AbrigoEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfaceAbrigoRepository {
  criaAbrigo(abrigo: AbrigoEntity): Promise<void>;
  listaAbrigos(): Promise<AbrigoEntity[]> | AbrigoEntity[];
  atualizaAbrigo(id: number, abrigo: AbrigoEntity): Promise<void>;
  deletaAbrigo(id: number): Promise<void>;
  atualizaEnderecoAbrigo(id: number, endereco: EnderecoEntity): Promise<void>;
}
