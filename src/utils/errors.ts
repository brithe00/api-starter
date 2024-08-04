import { z } from "zod";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  details: z.ZodError["errors"];

  constructor(zodError: z.ZodError) {
    super("Validation error", 400);
    this.details = zodError.errors;
  }
}
