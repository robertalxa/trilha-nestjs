import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/interfaceAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async listaAdotante(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }

  async atualizaAdotante(id: number, adotante: AdotanteEntity) {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });

    if (!adotanteToUpdate) {
      throw new NaoEncontrado("Adotante não econtrado");
    }

    Object.assign(adotanteToUpdate, adotante);

    await this.repository.save(adotanteToUpdate);
  }

  async deletaAdotante(id: number) {
    const adotanteToDelete = await this.repository.find({ where: { id } });

    if (!adotanteToDelete) {
      throw new NaoEncontrado("Adotante não econtrado");
    }

    await this.repository.remove(adotanteToDelete);
  }

  private async verificaCelularAdotante(celular: string) {
    return await this.repository.findOne({ where: { celular } });
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    if (await this.verificaCelularAdotante(adotante.celular)) {
      throw new RequisicaoRuim("Celular já cadastrado");
    }
    await this.repository.save(adotante);
  }

  async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity) {
    const adotante = await this.repository.findOne({
      where: { id: idAdotante },
    });

    if (!adotante) {
      throw new NaoEncontrado("Adotante não econtrado");
    }

    const { cidade, estado } = endereco;
    const novoEndereco = new EnderecoEntity(cidade, estado);
    adotante.endereco = novoEndereco;

    this.repository.save(adotante);
  }
}
