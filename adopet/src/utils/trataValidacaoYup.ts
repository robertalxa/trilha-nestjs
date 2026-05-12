import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

const trataValidacaoYup = async (
  schema: yup.Schema<unknown>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await schema.validate(req.body, {
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

export { trataValidacaoYup };
