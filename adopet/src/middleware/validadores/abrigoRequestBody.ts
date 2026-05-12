import * as yup from "yup";
import { pt } from "yup-locale-pt";
import { TipoRequestBodyAbrigo } from "../../tipos/tiposAbrigo";
import { trataValidacaoYup } from "../../utils/trataValidacaoYup";
import { NextFunction, Request, Response } from "express";

yup.setLocale(pt);

const schemaBodyAbrigo: yup.ObjectSchema<
  Omit<TipoRequestBodyAbrigo, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
  email: yup.string().defined().required().email("Email inválido"),
  senha: yup
    .string()
    .defined()
    .required()
    .min(6)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
      "Senha inválida",
    ),
  celular: yup
    .string()
    .defined()
    .required()
    .matches(
      /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
      "Celular inválido",
    ),
});

const middlewareValidadorBodyAbrigo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => trataValidacaoYup(schemaBodyAbrigo, req, res, next);

export { middlewareValidadorBodyAbrigo };
