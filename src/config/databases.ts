import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

function newConnection(uri: string) {
  const db = mongoose.createConnection(uri, {});
  db.on("error", (err) => {
    console.log(`Connected Failed`);
    db.close().catch(() => console.log("Mongodb:::: failed to close"));
  });

  db.on("connected", (res) => {
    console.log(`Connected to database "${db?.name}" successfully`);
  });

  db.on("disconnected", (err) => {
    console.log(`Mongodb disconnected`);
  });

  return db;
}

export const runConnectDB = () => {
  return "connect db";
};

const {
  BINGO_DB_URI,
  POKER_DB_URI,
  POKERFINANCE_DB_URI,
  POKERADMIN_DB_URI,
  POKERLOGADMIN_DB_URI,
  TOURNAMENT_BINGO_DB_URI,
  POKERIM_DB_URI,
  BINGO50_DB_URI,
} = process.env;
const pokerDb = newConnection(POKER_DB_URI);
const tournamentBingoDb = newConnection(TOURNAMENT_BINGO_DB_URI);
const financeDb = newConnection(POKERFINANCE_DB_URI);
const bingoDb = newConnection(BINGO_DB_URI);
const adminDb = newConnection(POKERADMIN_DB_URI);
const pokerlogDb = newConnection(POKERLOGADMIN_DB_URI);
const pokerimDb = newConnection(POKERIM_DB_URI);
const bingo50Db = newConnection(BINGO50_DB_URI);

export const databases = {
  pokerDb,
  bingoDb,
  financeDb,
  adminDb,
  pokerlogDb,
  tournamentBingoDb,
  pokerimDb,
  bingo50Db,
};
