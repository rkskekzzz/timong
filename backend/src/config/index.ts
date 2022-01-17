import path from "path";
import dotenv from "dotenv";

const env_file =
  process.env.NODE_ENV === "production"
    ? "./env/.env.production"
    : "./env/.env.development";
dotenv.config({ path: path.join(path.resolve(), env_file) });

function configCheck(key: string) {
  const value = process.env[key];

  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }

  return value;
}

export default {
  host: {
    port: parseInt(configCheck("HOST_PORT")),
  },
  db: {
    host: configCheck("DB_HOST"),
    port: parseInt(configCheck("DB_PORT")),
    user: configCheck("DB_USER"),
    password: configCheck("DB_PASSWORD"),
  },
};
