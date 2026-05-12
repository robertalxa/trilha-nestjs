import * as yup from "yup";
import { pt } from "yup-locale-pt";
import { NextFunction, Request, Response } from "express";
import EnderecoEntity from "../../entities/EnderecoEntity";
import { trataValidacaoYup } from "../../utils/trataValidacaoYup";

yup.setLocale(pt);

const schemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> =
  yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
  });

const middlewareValidadorBodyEndereco = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => trataValidacaoYup(schemaBodyEndereco, req, res, next);

export { middlewareValidadorBodyEndereco };
