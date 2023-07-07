import { Request, Response } from "express";
import config from "../config/config";
import { getData, redis } from "../config/redis";
import { tournamentWebServer } from "../config/streams";
import * as stageRepo from "../repositories/Stage.repo";
import * as utils from "../utils/common.util";

export let getSearchList = async (req: Request, res: Response, next) => {
  try {
    const str = req.query.string || "";
    const data = await stageRepo.getSearchList(str);

    if (data.length === 0) {
      return res.status(200).send({ status: "No item found" });
    } else {
      if (config.encryptionEnable === true) {
        const encrypted = utils.encrypt(JSON.stringify(data));
        encrypted.then((encryptedData) => {
          if (data) {
            return res
              .status(200)
              .send({ data: encryptedData, status: "success" });
          } else {
            return res.status(200).send({ status: "No item found" });
          }
        });
      } else {
        return res.status(200).send({ data, status: "success" });
      }
    }
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};

export let getAll = async (req: Request, res: Response, next) => {
  try {
    const data = await stageRepo.getStages();

    if (data.length > 0) {
      if (config.encryptionEnable === true) {
        const encrypted = utils.encrypt(JSON.stringify(data));
        encrypted.then((encryptedData) => {
          if (data) {
            return res
              .status(200)
              .send({ data: encryptedData, status: "success" });
          } else {
            return res.status(200).send({ status: "No item found" });
          }
        });
      } else {
        return res.status(200).send({ data, status: "success" });
      }
    } else {
      return res.status(200).send({ status: "No item found" });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};

export let publishStage = async (req: Request, res: Response, next) => {
  try {
    const stage = req.body.stageId;
    console.log(stage);
    const selectedStage = await stageRepo.getStage(stage);
    const playerId = "Admin";
    if (!selectedStage) {
      console.log(`${stage} not found`);
    } else {
      //   selectedStage.name = `My Tournament ${
      //     selectedStage.name
      //   } - ${new Date().getTime()}`;
      selectedStage.actionTime = 10;
      selectedStage.smallBlind = 2;
      selectedStage.bigBlind = 2;
      selectedStage.payoutId = selectedStage.payoutId;
      selectedStage.blindStructureId = selectedStage.blindStructureId;

      selectedStage.playerName = "Admin";
      selectedStage.channelName = selectedStage.name;
      selectedStage.channelVariation = "Texas Hold’em" || "Omaha";
      selectedStage.maxPlayers = 16;
      selectedStage.playerId = "Admin";

      const event = {
        eventName: "SitNgoPublishedByAdmin",
        data: { playerId, data: selectedStage },
      };
      await redis.xadd(
        tournamentWebServer.inStream,
        "*",
        "data",
        JSON.stringify(event)
      );

      console.log("vao day");

      await stageRepo.updatePublishStage(stage);

      res.status(200).send({ status: "success" });
    }
  } catch (error) {
    console.log(error);
  }
};

export let getOneStage = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const data = await stageRepo.getStage(id);
    if (data.length === 0) {
      res.status(200).send("No item found");
    } else {
      if (config.encryptionEnable === true) {
        const encrypted = utils.encrypt(JSON.stringify(data));
        encrypted.then((encryptedData) => {
          if (data) {
            return res
              .status(200)
              .send({ data: encryptedData, status: "success" });
          } else {
            return res.status(200).send("No item found");
          }
        });
      } else {
        return res.status(200).send({ data, status: "success" });
      }
    }
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};

export let createStage = async (req: Request, res: Response, next) => {
  try {
    console.log(">>>>>>>>>>>>>");
    console.log(req.body);
    const name = req.body.name;
    const exist = await stageRepo.getStageWithName(name);
    if (exist.length > 0) {
      res.status(404).send({ status: "Stage Name is already exist" });
    } else {
      const tCreate = await stageRepo.create({ ...req.body });
      return res.status(200).send({
        status: "Stage created successfully",
      });
    }
  } catch (error) {
    console.log("?????" + error);
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};

export let updateStage = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    console.log("aaa", req.body);

    await stageRepo.updateStageWithId(id, { ...req.body });
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};

export let deleteOne = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    await stageRepo.deleteStage(id);
    res.status(200).send({ status: "deleted item" });
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};
