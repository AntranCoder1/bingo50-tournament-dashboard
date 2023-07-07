import mongoose from "mongoose";
import Tournament from "../models/Tournament.model";

export const totalCount = async (data: any) => {
  const result = await Tournament.find(data).sort({ _id: -1 }).count();
  return result;
};

export const getTournaments = async (
  data: any,
  limit: number,
  page: number
) => {
  const result = Tournament.find(data)
    .sort({ _id: -1 })
    .limit(limit)
    .skip(limit * (page - 1));

  return result;
};

export const getSearchList = async (str: any) => {
  const result = await Tournament.find({
    tournamentName: {
      $regex: str,
      $options: "i",
    },
  }).sort({ _id: -1 });

  return result;
};

export const notNested = async (id: string) => {
  const result = await Tournament.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        _id: 1,
        tournamentName: 1,
        tournamentType: 1,
        // gameVariation: 1,
        type: 1,
        chipType: 1,
        startingChips: 1,
        isGtdEnabled: 1,
        guaranteedValue: 1,
        // actionTime: 1,
        turnTime: 1,
        minPlayersToStart: 1,
        maxPlayersAllowed: 1,
        playerPerTables: 1,
        entryFees: 1,
        maxPlayersAtStart: 1,
        houseFees: 1,
        totalEntryFees: 1,
        unregisterCutOffTime: 1,
        timeBank: 1,
        isAddTimeBank: 1,
        timeBankRuleId: 1,
        // blindRuleId: "$blindRuleId",
        betLevelStructureId: "$betLevelStructureId",
        lateRegistrationAllowed: 1,
        lateRegistrationTime: 1,
        isAddonTimeEnabled: 1,
        numberOfAddOn: "$addOn.numberOfAddOn",
        addOnPrice: "$addOn.addOnPrice",
        addOnChip: "$addOn.addOnChip",
        addOnTime: "$addOn.addOnTime",
        isRebuyAllowed: 1,
        isReentryAllowed: 1,
        payoutType: 1,
        payoutId: 1,
        registrationBeforeStarttime: 1,
        tournamentStartTime: 1,
        rebuyRealChip: "$rebuy.rebuyPrice.rebuyRealChip",
        rebuyVipPoint: "$rebuy.rebuyPrice.rebuyVipPoint",
        rebuyAmount: "$rebuy.rebuyPrice.rebuyAmount",
        rebuyHouseFee: "$rebuy.rebuyPrice.rebuyHouseFee",
        rebuyPoint: "$rebuy.rebuyPrice.rebuyPoint",
        rebuyTicket: "$rebuy.rebuyPrice.rebuyTicket",
        isRebuyTicket: "$rebuy.rebuyPrice.isRebuyTicket",
        totalRebuyChip: "$rebuy.rebuyPrice.totalRebuyTicket",
        rebuyCondition: "$rebuy.rebuyCondition",
        rebuyChip: "$rebuy.rebuyChip",
        numberOfRebuy: "$rebuy.numberOfRebuy",
        lastRebuy: "$rebuy.lastRebuy",
        reentryChip: "$reentry.reentryChip",
        numberOfReentry: "$reentry.numberOfReentry",
        lastReentry: "$reentry.lastReentry",
        reentryRealChip: "$reentry.reentryPrice.reentryRealChip",
        reentryVipPoint: "$reentry.reentryPrice.reentryVipPoint",
        isReentryTicket: "$reentry.reentryPrice.isReentryTicket",
        reentryAmount: "$reentry.reentryPrice.reentryAmount",
        reentryTicket: "$reentry.reentryPrice.reentryTicket",
        reentryHouseFee: "$reentry.reentryPrice.reentryHouseFee",
        reentryPoint: "$reentry.reentryPrice.reentryPoint",
        totalReentryChip: "$reentry.reentryPrice.totalReentryChip",
      },
    },
  ]);

  return result;
};

export const getAll = async () => {
  return await Tournament.find().sort({ _id: -1 });
};

export const getAllName = async () => {
  const result = await Tournament.find({
    $and: [
      {
        state: {
          $ne: "CANCELED",
        },
      },
      {
        state: {
          $ne: "UPCOMING",
        },
      },
    ],
  }).sort({ _id: -1 });

  return result;
};

export const getTournament = async (id: string) => {
  return await Tournament.findOne({ _id: id });
};

export const getTournamentCancel = async (id: string) => {
  const result = await Tournament.find(
    { state: { $in: ["UPCOMING", "REGISTER"] } },
    { _id: id }
  );

  return result;
};

export const updateTournament = async (id: string, data: any) => {
  const result = await Tournament.updateOne(
    {
      _id: id,
    },
    {
      $set: data,
    }
  ).exec();

  return result;
};

export const updateTournamentId = async (id: string) => {
  const result = await Tournament.updateOne(
    {
      _id: id,
    },
    [
      {
        $project: {
          doc: {
            $arrayToObject: {
              $filter: {
                input: {
                  $objectToArray: "$$ROOT",
                },
                cond: {
                  $ne: ["$$this.v", null],
                },
              },
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$doc",
        },
      },
    ],
    { multi: true }
  ).exec();

  return result;
};

export const deleteTournament = async (id: string) => {
  return await Tournament.deleteOne({ _id: id });
};

export const getTournamentName = async (tournamentName: string) => {
  return await Tournament.find({
    tournamentName,
  });
};

export const createTournament = async (data: any) => {
  const newTournament = new Tournament(data);
  return newTournament.save();
};
