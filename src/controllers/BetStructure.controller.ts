import { Request, Response } from "express";
import * as betStructureRepo from "../repositories/BetStructure.repo";

export const createBetStructure = async (req: Request, res: Response) => {
  try {
    const { type, betList, name, description } = req.body;

    const createBlind = await betStructureRepo.createBetStructure(
      type,
      betList,
      name,
      description
    );

    if (createBlind) {
      res.status(201).send({ status: true });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(400).send({ status: false, message: (error as Error).message });
  }
};

export const getBetStructures = async (req: Request, res: Response) => {
  try {
    const { type, name, page, limit } = req.body;

    const findBetStructures = await betStructureRepo.getBetStructures(
      type,
      name,
      page,
      limit
    );

    const count = await betStructureRepo.countDocument(type, name);

    if (findBetStructures) {
      res.status(200).send({ status: true, data: findBetStructures, count });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(400).send({ status: false, message: (error as Error).message });
  }
};

export const getBetStructure = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findBetStructure = await betStructureRepo.getBetStructureId(id);

    if (findBetStructure) {
      res.status(200).send({ status: true, data: findBetStructure });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(400).send({ status: false, message: (error as Error).message });
  }
};

export const deleteBetStructure = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteBet = await betStructureRepo.deleteBetStructure(id);

    if (deleteBet) {
      res.status(200).send({ status: true });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(400).send({ status: false, message: (error as Error).message });
  }
};

export const updateBetStructure = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, betList, name, description } = req.body;

    const editBetStructure = await betStructureRepo.updateBetStructure(
      id,
      name,
      description,
      type,
      betList
    );

    if (editBetStructure) {
      res.status(200).send({ status: true });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(400).send({ status: false, message: (error as Error).message });
  }
};

export const getByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.body;

    const getBetStructureWithType = await betStructureRepo.getByType(type);

    if (getBetStructureWithType) {
      res.status(200).send({ status: true, data: getBetStructureWithType });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(400).send({ status: false, message: (error as Error).message });
  }
};
