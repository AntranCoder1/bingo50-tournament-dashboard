import mongoose from "mongoose";
import PayoutStructure from "../models/PayoutStructure.model";
import { IPayoutStructure } from "../utils/Types";

export const findPayoutStructureId = async (id: string) => {
  const r = (Math.random() + 1).toString(36).substring(7);

  const result = await PayoutStructure.aggregate([
    {
      $match: {
        payoutStructureId: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $addFields: {
        code: r,
      },
    },
  ]);

  return result;
};

export const duplicateData = async (data: any) => {
  const result = await PayoutStructure.insertMany(data);

  return result;
};

export const updatePayoutStructure = async (data1: any, tCreate: any) => {
  const result = await PayoutStructure.updateMany(
    { code: data1[0].code },
    {
      $set: {
        payoutStructureId: tCreate._id,
      },
    }
  );

  return result;
};

export const getPayoutStructures = async () => {
  return await PayoutStructure.find().sort({ _id: -1 });
};

export const getPayoutStructure = async (id: string) => {
  return await PayoutStructure.findOne({ _id: id }).populate("Payout");
};

export const create = async (data: any) => {
  const newPayoutStructure = new PayoutStructure(data);
  return newPayoutStructure.save();
};

export const updatePayoutStructureId = async (id: string, data: any) => {
  const result = await PayoutStructure.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        playerRange: data.range,
        numberOfWinners: data.noWinners,
        minPlayers: data.minPlayer,
        maxPlayers: data.maxPlayer,
        payoutRecord: data.payoutArray,
      },
    }
  ).exec();

  return result;
};

export const updatePayoutRecord = async (id: string, payoutArray: any) => {
  const result = await PayoutStructure.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        payoutRecord: {
          $each: payoutArray,
        },
      },
    }
  ).exec();

  return result;
};

export const deletePayoutStructure = async (id: string) => {
  const result = await PayoutStructure.deleteOne({ _id: id });
  return result;
};
