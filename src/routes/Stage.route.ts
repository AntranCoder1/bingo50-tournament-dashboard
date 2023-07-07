import express from "express";
import * as stage from "../controllers/Stage.controller";
import adminMiddleware from "../middlewares/admin.middleware";
import jwtMiddleware from "../middlewares/jwt.middleware";
const router = express.Router();

router.get("/list", jwtMiddleware, stage.getSearchList);

router.get("/", stage.getAll);

router.post("/publish", jwtMiddleware, stage.publishStage);

router.get("/:id", jwtMiddleware, stage.getOneStage);

router.post("/", jwtMiddleware, stage.createStage);

router.post("/:id", jwtMiddleware, stage.updateStage);

router.delete("/:id", jwtMiddleware, stage.deleteOne);

export default router;
