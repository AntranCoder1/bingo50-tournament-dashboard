import { Request, Response } from "express";
import config from "../config/config";
import * as payoutRepo from "../repositories/Payout.repo";
import * as payoutStructureRepo from "../repositories/PayoutStructure.repo";
import * as utils from "../utils/common.util";
import { IPayout } from "../utils/Types";

export let getAll = async (req: Request, res: Response, next) => {
  try {
    const data = await payoutRepo.getPayouts();

    let index = 1;
    for (const i of data) {
      i.no = index++;
    }
    if (data.length > 0) {
      if (config.encryptionEnable === true) {
        const encrypted = utils.encrypt(JSON.stringify(data));

        encrypted.then((encryptedData) => {
          if (encryptedData) {
            console.log(utils.decrypt(encryptedData));
            return res
              .status(200)
              .send({ data: encryptedData, status: "success" });
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

export let createPayout = async (req: Request, res: Response, next) => {
  try {
    const names = req.body.name;

    const dateTime = new Date();

    const exist = await payoutRepo.findPayout({ payoutName: names });
    console.log("exist: ", exist);

    if (exist.length > 0) {
      res.status(404).send({ status: "Rule Name is already exist" });
    } else {
      const tCreate = await payoutRepo.create({
        payoutName: names,
        created_at: dateTime,
      });
      return res.status(200).send({ status: "PayOut created successfully" });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};

export let getOnePayout = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;

    const data = await payoutRepo.getPayout(id);

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

export let deleteOne = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;

    const delPayout = await payoutRepo.deletePayout(id);

    if (delPayout) {
      res.status(200).send({ status: "deleted item" });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(500).send("InternalServerError");
  }
};

export let duplicate = async (req: Request, res: Response, next) => {
  try {
    const names = req.body.name;
    const id = req.params.id;
    const dateTime = new Date();
    const exist = await payoutRepo.findPayout({ payoutName: names });
    if (exist.length > 0) {
      return res.status(200).send({ status: "Rule Name is already exist" });
    }
    const tCreate = await payoutRepo.create({
      payoutName: names,
      created_at: dateTime,
    });
    const data = await payoutStructureRepo.findPayoutStructureId(id);
    const data1 = await payoutStructureRepo.duplicateData(data);
    const updatePayoutStructure =
      await payoutStructureRepo.updatePayoutStructure(data1, tCreate);

    if (data && data1 && updatePayoutStructure) {
      return res
        .status(200)
        .send({ status: "PayOut created successfully", data: data1 });
    } else {
      return res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};

export let getPayoutStructures = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const data = await payoutRepo.getPayoutStructures(id);
    const data1 = data[0].list;
    for (const b of data1) {
      b.length = b.payoutRecord.length;
    }
    if (config.encryptionEnable === true) {
      const encrypted = utils.encrypt(JSON.stringify(data));
      encrypted.then((encryptedData) => {
        if (data) {
          return res.status(200).send({
            data: encryptedData,
            name: data[0].payoutName,
            status: "success",
          });
        } else {
          res.status(404).send({ status: false, message: "not found" });
        }
      });
    } else {
      return res
        .status(200)
        .send({ data, name: data[0].payoutName, status: "success" });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: "InternalServerError" });
  }
};
