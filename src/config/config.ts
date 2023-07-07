import dotenv from "dotenv";
dotenv.config();

const config = {
  DB_URL: process.env.POKERTOURNAMENT_DB_URI,
  PORT: process.env.SERVER_LISTEN_PORT,
  JWT_SECRET: "SEED_JWT_SECRET_HERE",
  API_URL: "https://localhost:5000/",
  encryptionEnable: false,
  encryptionKey: "",
};

export const REDIS_CONFIG: any = {
  host: process.env.REDIS_CONFIG_HOST || "localhost",
  port: process.env.REDIS_CONFIG_PORT || "49153",
  username: "default",
  password: process.env.REDIS_CONFIG_PASSWORD,
};

export default config;
