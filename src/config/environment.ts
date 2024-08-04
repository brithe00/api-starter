import dotenv from "dotenv";

dotenv.config();

export const environment = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL,
};
