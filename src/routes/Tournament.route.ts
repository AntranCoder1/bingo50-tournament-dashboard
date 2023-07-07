import express from "express";
import * as TournamentController from "../controllers/Tournament.controller";
import jwtMiddleware from "../middlewares/jwt.middleware";
const router = express.Router();

// router.post(
//   "/createTournament",
//   jwtMiddleware,
//   TournamentController.createTournament
// );

// router.post(
//   "/getListTournament",
//   jwtMiddleware,
//   TournamentController.getListTournament
// );

router.post("/", jwtMiddleware, TournamentController.createTournament);

router.post("/getAll", TournamentController.getListTournament);

router.get("/list", jwtMiddleware, TournamentController.getSearchList);

router.get("/notNested/:id", jwtMiddleware, TournamentController.notNested);

router.post("/filter", jwtMiddleware, TournamentController.getFilterList);

router.post(
  "/listTournament",
  jwtMiddleware,
  TournamentController.getByTournamentId
);

router.get("/", TournamentController.getAll);

router.get("/getAllName", jwtMiddleware, TournamentController.getAllName);

router.get("/:id", jwtMiddleware, TournamentController.getOneTournament);

router.post("/cancel", jwtMiddleware, TournamentController.cancel);

router.post("/:id", jwtMiddleware, TournamentController.updateTournament);

router.delete("/:id", jwtMiddleware, TournamentController.deleteOne);

router.post("/changeStatus/:id", TournamentController.changeStatus);

router.post(
  "/getOneTournamentFromRedis/:id",
  TournamentController.getOneTournamentFromRedis
);

router.post(
  "/getOneTournamentFromClosed/:id",
  TournamentController.getOneTournamentFromClosed
);

export default router;
