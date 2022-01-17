import { Request, Response, NextFunction } from "express";
import "express-async-errors";

export default class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export async function errorPageNotFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  throw new ApiError(404, `Page Not Found`);
}

export async function errorHandler(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "server error";

  res.status(statusCode).send(message);
}
