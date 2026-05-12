import * as yup from "yup";
import { pt } from "yup-locale-pt";
import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import { trataValidacaoYup } from "../../utils/trataValidacaoYup";

yup.setLocale(pt);

const schemaBodyAdotante: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
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
  foto: yup.string().optional(),
});

const middlewareValidadorBodyAdotante = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => trataValidacaoYup(schemaBodyAdotante, req, res, next);

export { middlewareValidadorBodyAdotante };
