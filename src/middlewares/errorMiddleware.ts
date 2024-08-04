import { Request, Response, NextFunction } from "express";
import { AppError, ValidationError } from "@/utils/errors";
import { z } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err instanceof ValidationError && { details: err.details }),
    });
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation Error",
      details: err.errors,
    });
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
