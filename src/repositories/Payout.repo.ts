import mongoose from "mongoose";
import Payout from "../models/Payout.model";
// import { databases } from "../config/databases";
import { IPayout } from "../utils/Types";

export const getPayouts = async () => {
  const result = await Payout.find().sort({ _id: 1 });

  if (result) {
    return result;
  } else {
    return [];
  }
};

export const findPayout = async (data) => {
  const result = await Payout.aggregate([
    {
      $match: data,
    },
  ]);

  return result;
};

export const create = async (data: IPayout) => {
  const newPayout = new Payout(data);
  return newPayout.save();
};

export const getPayout = async (id: string) => {
  return await Payout.findOne({ _id: id });
};

export const deletePayout = async (id: string) => {
  const result = await Payout.deleteOne({ _id: id });

  return result;
};

export const getPayoutStructures = async (id: string) => {
  const result = await Payout.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "payoutStructure",
        let: {
          payoutStructureId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$payoutStructureId", "$$payoutStructureId"] }],
              },
            },
          },
          {
            $sort: {
              maxPlayers: 1,
            },
          },
        ],
        as: "list",
      },
    },
  ]);

  return result;
};
