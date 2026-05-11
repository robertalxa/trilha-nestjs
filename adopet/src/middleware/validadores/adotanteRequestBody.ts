import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";

const schemaBodyAdotante: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
  senha: yup.string().defined().required().min(6),
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
) => {
  try {
    await schemaBodyAdotante.validate(req.body, {
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

export { middlewareValidadorBodyAdotante };
