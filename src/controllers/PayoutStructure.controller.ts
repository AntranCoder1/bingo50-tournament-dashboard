import { Request, Response } from "express";
import config from "../config/config";
import * as payoutStructureRepo from "../repositories/PayoutStructure.repo";
import * as utils from "../utils/common.util";

export let getAll = async (req: Request, res: Response, next) => {
  try {
    const data = await payoutStructureRepo.getPayoutStructures();
    if (data.length > 0) {
      if (config.encryptionEnable === true) {
        const encrypted = utils.encrypt(JSON.stringify(data));
        // JSON.parse(encrypted);
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

export let getOnePayoutStructure = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    const id = req.params.id;
    const data = await payoutStructureRepo.getPayoutStructure(id);
    if (data.length === 0) {
      res.status(200).send({ status: "failed" });
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

export let createPayoutStructure = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    const body = await req.body;
    console.log(body);
    const dateTime = new Date();
    const noWinners = body.numberOfWinners;
    const minPlayer = body.minPlayer;
    const maxPlayer = body.maxPlayer;
    const payoutArray = body.payoutRecord;
    const range: string = minPlayer + " - " + maxPlayer;
    const id = body.payoutId;
    if (
      Number(noWinners) > Number(maxPlayer) ||
      Number(minPlayer) > Number(maxPlayer) ||
      Number(minPlayer) === Number(maxPlayer)
    ) {
      res.status(200).send({
        status:
          "Number of Winners or Min Players can't be greater than Max Players",
      });
    } else {
      const tCreate = await payoutStructureRepo.create({
        playerRange: range,
        created_at: dateTime,
        numberOfWinners: noWinners,
        minPlayers: minPlayer,
        maxPlayers: maxPlayer,
        payoutRecord: payoutArray,
        payoutStructureId: id,
      });
      return res.status(200).send({
        status: "Payout Structure created successfully",
        data: tCreate,
      });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};

export let updatePayoutStructure = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    console.log(req.body);

    const id = req.params.id;
    const noWinners = req.body.numberOfWinners;
    const minPlayer = req.body.minPlayer;
    const maxPlayer = req.body.maxPlayer;
    const payoutArray = req.body.payoutRecord;
    const range: string = minPlayer + " - " + maxPlayer;
    if (
      Number(noWinners) > Number(maxPlayer) ||
      Number(minPlayer) > Number(maxPlayer) ||
      Number(minPlayer) === Number(maxPlayer)
    ) {
      res.status(200).send({
        status:
          "Number of Winners or Min Players can't be greater than Max Players",
      });
    }
    if (Object.keys(payoutArray).length === 1) {
      await payoutStructureRepo.updatePayoutStructureId(id, {
        range,
        noWinners,
        minPlayer,
        maxPlayer,
        payoutArray,
      });
    }
    if (Object.keys(payoutArray).length > 1) {
      await payoutStructureRepo.updatePayoutStructureId(id, {
        range,
        noWinners,
        minPlayer,
        maxPlayer,
        payoutArray: [],
      });
      await payoutStructureRepo.updatePayoutRecord(id, payoutArray);
    }
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};

export let deleteOne = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const deletePayoutStructure =
      await payoutStructureRepo.deletePayoutStructure(id);

    if (deletePayoutStructure) {
      res.status(200).send({ status: "deleted item" });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};
