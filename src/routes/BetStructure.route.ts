import express from "express";
import * as betStructureController from "../controllers/BetStructure.controller";
import jwtMiddleware from "../middlewares/jwt.middleware";
const router = express.Router();

router.post(
  "/createBetStructure",
  jwtMiddleware,
  betStructureController.createBetStructure
);

router.post("/", jwtMiddleware, betStructureController.getBetStructures);

router.get("/:id", jwtMiddleware, betStructureController.getBetStructure);

router.delete("/:id", jwtMiddleware, betStructureController.deleteBetStructure);

router.put("/:id", jwtMiddleware, betStructureController.updateBetStructure);

router.post("/getBetLevelByType", jwtMiddleware, betStructureController.getByType);

export default router;
