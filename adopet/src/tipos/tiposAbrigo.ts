import AbrigoEntity from "../entities/AbrigoEntity";

type TipoRequestBodyAbrigo = Omit<AbrigoEntity, "id" | "endereco">;
type TipoResponseBodyAbrigo = Pick<
  AbrigoEntity,
  "id" | "nome" | "celular" | "email" | "endereco"
>;
type TipoRequestParamsAbrigo = { id?: string };

export {
  TipoRequestBodyAbrigo,
  TipoRequestParamsAbrigo,
  TipoResponseBodyAbrigo,
};
