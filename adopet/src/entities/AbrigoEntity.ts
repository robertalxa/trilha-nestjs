import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import { criaSenhaCriptografada } from "../utils/senhaCriptografada";

@Entity()
export default class AbrigoEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  endereco?: EnderecoEntity;

  @Column()
  nome: string;
  @Column({ unique: true })
  email: string;
  @Column()
  senha: string;
  @Column({ unique: true })
  celular: string;

  constructor(
    nome: string,
    email: string,
    senha: string,
    celular: string,
    endereco?: EnderecoEntity,
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.celular = celular;
    this.endereco = endereco;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async criptografaSenha(senha: string) {
    this.senha = criaSenhaCriptografada(this.senha);
  }
}
