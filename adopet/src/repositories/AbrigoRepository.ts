import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import InterfaceAbrigoRepository from "./interfaces/interfaceAbrigoRepository";
import { RequisicaoRuim } from "../utils/manipulaErros";

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  private repository: Repository<AbrigoEntity>;
  constructor(repository: Repository<AbrigoEntity>) {
    this.repository = repository;
  }

  private async verificaEmailAbrigo(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  private async verificaCelularAbrigo(celular: string) {
    return await this.repository.findOne({ where: { celular } });
  }

  async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
    const existeEmail = await this.verificaEmailAbrigo(abrigo.email);
    if (existeEmail) {
      throw new RequisicaoRuim("Email já existe");
    }

    const existeCelular = await this.verificaCelularAbrigo(abrigo.celular);
    if (existeCelular) {
      throw new RequisicaoRuim("Celular já existe");
    }

    await this.repository.save(abrigo);
  }
  listaAbrigos(): Promise<AbrigoEntity[]> | AbrigoEntity[] {
    throw new Error("Method not implemented.");
  }
  atualizaAbrigo(id: number, abrigo: AbrigoEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deletaAbrigo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  atualizaEnderecoAbrigo(id: number, endereco: EnderecoEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
