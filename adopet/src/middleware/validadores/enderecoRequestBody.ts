import * as yup from "yup";
import { pt } from "yup-locale-pt";
import { NextFunction, Request, Response } from "express";
import EnderecoEntity from "../../entities/EnderecoEntity";

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
) => {
  try {
    await schemaBodyEndereco.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    const yupErrors = errors as yup.ValidationError;
    const validationErrors: Record<string, string> = {};
    yupErrors.inner.forEach((error) => {
      if (!error.path) return;
      validationErrors[error.path] = error.message;
    });
    return res.status(400).json({ error: validationErrors });
  }
};

export { middlewareValidadorBodyEndereco };
