import dotenv from "dotenv";
dotenv.config();

const config = {
  DB_URL: process.env.TOURNAMENT_BINGO_DB_URI,
  PORT: process.env.SERVER_LISTEN_PORT,
  JWT_SECRET: process.env.HASH_KEY,
  encryptionEnable: false,
  userName: "admin",
  password: "123456",
  hostSocket: "https://3.13.43.232:3001/",
  INITIAL_BOT_BALANCE: 100000,
  API_URL: "https://localhost:5000/",
};

export default config;
