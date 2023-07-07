import BetStructure from "../models/betStructure.model";

export const createBetStructure = async (
  type: string,
  data: any,
  name: string,
  description: string
) => {
  const betStructureHandlers = {
    Steady: (i: any) => ({
      level: data.indexOf(i) + 1,
      ante: i.ante,
      bet: i.bet,
      time: i.time,
    }),
    Freeze: (i: any) => ({
      level: data.indexOf(i) + 1,
      ante: i.ante,
      bet: i.bet,
      lastBet: i.lastBet,
      time: i.time,
    }),
    Max: (i: any) => ({
      level: data.indexOf(i) + 1,
      ante: i.ante,
      bet: i.bet,
      betAdder: i.betAdder,
      time: i.time,
    }),
  };

  const betStructureArr = data.map((i: any) => betStructureHandlers[type](i));

  if (!betStructureHandlers[type]) {
    throw new Error("Invalid bet structure type.");
  }

  const betStructureData = {
    name,
    description,
    type,
    betList: betStructureArr,
  };

  const newBetStructure = new BetStructure(betStructureData);
  return newBetStructure.save();
};

export const getBetStructures = async (type, name, page, limit) => {
  const Page: number = Number(page) || 1;
  const Limit: number = Number(limit) || 10;

  const betStructureQuery: any = {};
  const condition: any = [];
  if (!!type) {
    condition.push({ type: { $regex: type, $options: "i" } });
  }

  if (!!name) {
    condition.push({ name: { $regex: name, $options: "i" } });
  }

  if (condition.length > 0) {
    betStructureQuery.$and = condition;
  }

  const result = await BetStructure.aggregate([
    {
      $match: betStructureQuery,
    },
    { $sort: { createdAt: -1 } },
    { $skip: (Page - 1) * Limit },
    { $limit: Limit },
    {
      $project: {
        _id: 1,
        type: 1,
        name: 1,
        description: 1,
        betList: 1,
      },
    },
  ]);

  return result;
};

export const countDocument = async (type, name) => {
  const betStructureQuery: any = {};
  const condition: any = [];
  if (!!type) {
    condition.push({ type: { $regex: type, $options: "i" } });
  }

  if (!!name) {
    condition.push({ name: { $regex: name, $options: "i" } });
  }

  if (condition.length > 0) {
    betStructureQuery.$and = condition;
  }

  const result = await BetStructure.aggregate([
    {
      $match: betStructureQuery,
    },
    {
      $count: "count",
    },
  ]);

  return result[0]?.count || 0;
};

export const getBetStructureId = async (id: string) => {
  const result = await BetStructure.findOne({ _id: id });

  if (result) {
    return result;
  } else {
    return false;
  }
};

export const deleteBetStructure = async (id: string) => {
  const result = await BetStructure.deleteOne({ _id: id });

  if (result) {
    return true;
  } else {
    return false;
  }
};

export const updateBetStructure = async (
  id: string,
  name: string,
  description: string,
  type: string,
  betListArr: any
) => {
  const betStructureHandlers = {
    Steady: (i: any) => ({
      level: betListArr.indexOf(i) + 1,
      ante: i.ante,
      bet: i.bet,
      time: i.time,
    }),
    Freeze: (i: any) => ({
      level: betListArr.indexOf(i) + 1,
      ante: i.ante,
      bet: i.bet,
      lastBet: i.lastBet,
      time: i.time,
    }),
    Max: (i: any) => ({
      level: betListArr.indexOf(i) + 1,
      ante: i.ante,
      bet: i.bet,
      betAdder: i.betAdder,
      time: i.time,
    }),
  };

  const betStructureArr = betListArr.map((i: any) =>
    betStructureHandlers[type](i)
  );

  if (!betStructureHandlers[type]) {
    throw new Error("Invalid bet structure type.");
  }

  const betStructureData = {
    name,
    description,
    type,
    betList: betStructureArr,
  };
  const result = await BetStructure.updateOne(
    { _id: id },
    betStructureData
  ).exec();

  if (result) {
    return true;
  } else {
    return false;
  }
};

export const getByType = async (type: string) => {
  const result = await BetStructure.aggregate([
    {
      $match: {
        type: { $regex: type, $options: "i" }
      },
    },
  ]);

  return result;
};
