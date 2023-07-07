import express from "express";
import * as payoutController from "../controllers/Payout.controller";
import jwtMiddleware from "../middlewares/jwt.middleware";

const router = express.Router();

router.get("/", jwtMiddleware, payoutController.getAll);

router.get("/:id", jwtMiddleware, payoutController.getOnePayout);

router.post("/", jwtMiddleware, payoutController.createPayout);

router.delete("/:id", jwtMiddleware, payoutController.deleteOne);

router.post("/duplicate/:id", jwtMiddleware, payoutController.duplicate);

router.get(
  "/viewPayoutStructure/:id",
  jwtMiddleware,
  payoutController.getPayoutStructures
);

export default router;
