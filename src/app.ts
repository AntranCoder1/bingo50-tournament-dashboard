import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config";
import { runConnectDB } from "./config/databases";
import { redisJson } from "./config/redis.connect";
// CONNECT DATABASE
mongoose.connect(config.DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

mongoose
  .connect(config.DB_URL, { useNewUrlParser: true })
  .then(() =>
    console.log(
      `Connected to database successfully
=======================================`
    )
  )
  .catch((err) => console.error(err));

const server = express();

redisJson();
runConnectDB();
// configure middlewares
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// configure routes
import userRoute from "./routes/User.route";
server.use("/auth", userRoute);

import TournamentRoute from "./routes/Tournament.route";
server.use("/Tournament", TournamentRoute);

import betStructureRoute from "./routes/BetStructure.route";
server.use("/betStructure", betStructureRoute);

import payoutRoute from "./routes/Payout.route";
server.use("/payout", payoutRoute);

import payoutStructureRoute from "./routes/PayoutStructure.route";
server.use("/payoutStructure", payoutStructureRoute);

import stageRoute from "./routes/Stage.route";
server.use("/stage", stageRoute);

server.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}!`);
});
