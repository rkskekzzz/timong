import mongoose from "mongoose";
import config from "../config";

export const mongooseConnect = async (): Promise<void> => {
  const host = config.db.host;
  const port = config.db.port;
  const user = config.db.user;
  const password = config.db.password;
  const connect = `mongodb://${user}:${password}@${host}:${port}`;
  console.log(connect);

  try {
    await mongoose.connect(connect);
  } catch (e) {
    throw new Error(`
      ##################################
      ❗️  Mongo DB connection Failed! ❗️
      ##################################
    `);
  }
};
