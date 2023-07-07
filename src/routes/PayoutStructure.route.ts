import express from "express";
import * as payoutStructureController from "../controllers/PayoutStructure.controller";
import jwtMiddleware from "../middlewares/jwt.middleware";

const router = express.Router();

router.get("/", jwtMiddleware, payoutStructureController.getAll);

router.get(
  "/:id",
  jwtMiddleware,
  payoutStructureController.getOnePayoutStructure
);

router.post(
  "/",
  jwtMiddleware,
  payoutStructureController.createPayoutStructure
);

router.post(
  "/:id",
  jwtMiddleware,
  payoutStructureController.updatePayoutStructure
);

router.delete("/:id", jwtMiddleware, payoutStructureController.deleteOne);

export default router;
