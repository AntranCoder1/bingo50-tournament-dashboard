import mongoose from "mongoose";
import Stage from "../models/Stage.model";

export const getSearchList = async (str) => {
  const result = await Stage.find({
    name: { $regex: str, $options: "i" },
  }).sort({ _id: -1 });

  return result;
};

export const getStages = async () => {
  return await Stage.find().sort({ _id: -1 });
};

export const getStage = async (id: string) => {
  return await Stage.findOne({ _id: id });
};

export const updatePublishStage = async (id: string) => {
  const updateStage = await Stage.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        isPublished: true,
      },
    }
  ).exec();

  return updateStage;
};

export const getStageWithName = async (name: string) => {
  return await Stage.find({ name });
};

export const create = async (data: any) => {
  const newStage = new Stage(data);
  return newStage.save();
};

export const updateStageWithId = async (id: string, data: any) => {
  const result = await Stage.updateOne(
    {
      _id: id,
    },
    {
      $set: data,
    }
  ).exec();

  return result;
};

export const deleteStage = async (id: string) => {
  const result = await Stage.deleteOne({ _id: id });

  return result;
};
