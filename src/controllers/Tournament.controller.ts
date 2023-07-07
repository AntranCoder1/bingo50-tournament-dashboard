import { Request, Response } from "express";
import createError from "http-errors";
import config from "../config";
import { databases } from "../config/databases";
import { getData, redis } from "../config/redis";
import {
  getTournamentByTournamentId,
  getTournamentPath,
} from "../config/redisPath";
import { tournamentWebServer } from "../config/streams";
import * as tournamentRepo from "../repositories/Tournament.repo";
import * as tournamentCloseRepo from "../repositories/TournamentClose.repo";
import * as utils from "../utils/common.util";

export let createTournament = async (req: Request, res: Response, next) => {
  try {
    const body = await req.body;
    const dateTime = new Date().getTime();

    const check = await tournamentRepo.getTournamentName(body.tournamentName);
    console.log("check: ", check);

    if (check.length > 0) {
      return (
        res.status(200).send({ status: "Tournament Name is already exists" }),
        next(createError(404, "Tournament Name is already exists"))
      );
    } else {
      const rebuy: any = {};
      rebuy.rebuyPrice = {};
      let reentry: any = {};
      reentry.reentryPrice = {};
      const addOn: any = {};
      const rebuyCondition = body.rebuyCondition
        ? (rebuy.rebuyCondition = body.rebuyCondition)
        : undefined;
      const rebuyChip = body.rebuyChip
        ? (rebuy.rebuyChip = body.rebuyChip)
        : undefined;
      const numberOfRebuy = body.numberOfRebuy
        ? (rebuy.numberOfRebuy = body.numberOfRebuy)
        : undefined;
      const lastRebuy = body.lastRebuy
        ? (rebuy.lastRebuy = body.lastRebuy)
        : undefined;
      const rebuyRealChip = body.rebuyRealChip
        ? (rebuy.rebuyPrice.rebuyRealChip = body.rebuyRealChip)
        : undefined;
      const rebuyVipPoint = body.rebuyVipPoint
        ? (rebuy.rebuyPrice.rebuyVipPoint = body.rebuyVipPoint)
        : undefined;
      const isRebuyTicket = body.isRebuyTicket
        ? (rebuy.rebuyPrice.isRebuyTicket = body.isRebuyTicket)
        : undefined;
      const rebuyAmount = body.rebuyAmount
        ? (rebuy.rebuyPrice.rebuyAmount = body.rebuyAmount)
        : undefined;
      const rebuyHouseFee = body.rebuyHouseFee
        ? (rebuy.rebuyPrice.rebuyHouseFee = body.rebuyHouseFee)
        : undefined;
      const totalRebuyChip = body.totalRebuyChip
        ? (rebuy.rebuyPrice.totalRebuyChip = body.totalRebuyChip)
        : undefined;
      const rebuyPoint = body.rebuyPoint
        ? (rebuy.rebuyPrice.rebuyPoint = body.rebuyPoint)
        : undefined;
      const rebuyTicket = body.rebuyTicket
        ? (rebuy.rebuyPrice.rebuyTicket = body.rebuyTicket)
        : undefined;
      const reentryChip = body.reentryChip
        ? (reentry.reentryChip = body.reentryChip)
        : undefined;
      const numberOfReentry = body.numberOfReentry
        ? (reentry.numberOfReentry = body.numberOfReentry)
        : undefined;
      const lastReentry = body.lastReentry
        ? (reentry.lastReentry = body.lastReentry)
        : undefined;
      const reentryRealChip = body.reentryRealChip
        ? (reentry.reentryPrice.reentryRealChip = body.reentryRealChip)
        : undefined;
      const reentryVipPoint = body.reentryVipPoint
        ? (reentry.reentryPrice.reentryVipPoint = body.reentryVipPoint)
        : undefined;
      const isreentryTicket = body.isReentryTicket
        ? (reentry.reentryPrice.isReentryTicket = body.isReentryTicket)
        : undefined;
      const reentryAmount = body.reentryAmount
        ? (reentry.reentryPrice.reentryAmount = body.reentryAmount)
        : (reentry.reentryPrice.reentryAmount = 0);
      const reentryHouseFee = body.reentryHouseFee
        ? (reentry.reentryPrice.reentryHouseFee = body.reentryHouseFee)
        : (reentry.reentryPrice.reentryHouseFee = 0);
      const totalReentryChip = body.totalreentryChip
        ? (reentry.reentryPrice.totalReentryChip = body.totalreentryChip)
        : undefined;
      const reentryPoint = body.reentryPoint
        ? (reentry.reentryPrice.reentryPoint = body.reentryPoint)
        : undefined;
      const reentryTicket = body.reentryTicket
        ? (reentry.reentryPrice.reentryTicket = body.reentryTicket)
        : undefined;
      const numberOfAddOn = body.numberOfAddOn
        ? (addOn.numberOfAddOn = body.numberOfAddOn)
        : undefined;
      const addOnPrice = body.addOnPrice
        ? (addOn.addOnPrice = body.addOnPrice)
        : undefined;
      const addOnChip = body.addOnChip
        ? (addOn.addOnChip = body.addOnChip)
        : undefined;
      const addOnTime = body.addOnTime
        ? (addOn.addOnTime = Object.values(body.addOnTime))
        : undefined;

      const names = req.body.tournamentName || undefined;
      const maxPlayersAtStart = req.body.maxPlayersAtStart || undefined;
      const tType = req.body.tournamentType || undefined;
      // const gVariation = req.body.gameVariation || undefined;
      const Type = req.body.type || undefined;
      const cType = req.body.chipType || undefined;
      const startChip = req.body.startingChips || undefined;
      const gtdEnable = req.body.isGtdEnabled ?? undefined;
      let guaValue = req.body.guaranteedValue || undefined;
      const acTime = req.body.turnTime || undefined;
      const minPlayer = req.body.minPlayersToStart || undefined;
      const maxPlayer = req.body.maxPlayersAllowed || undefined;
      const playerPerTab = req.body.playerPerTables || undefined;

      const unregisterCutTime = req.body.unregisterCutOffTime || undefined;
      // const isAddTimeBan = req.body.isAddTimeBank ?? undefined;
      // const timeBan = Number(req.body.timeBank);
      // const timeBankRuleid = req.body.timeBankRuleId || undefined;
      const betLevelStructureId = req.body.betLevelStructureId || undefined;
      const isLateRegisAllowed = req.body.lateRegistrationAllowed ?? undefined;
      let lateRegistTime = req.body.lateRegistrationTime || undefined;
      // const isAddOnTime = req.body.isAddonTimeEnabled ?? undefined;
      // const isRebuy = req.body.isRebuyAllowed ?? undefined;
      const isReentry = req.body.isReentryAllowed ?? undefined;
      // const payType = req.body.payoutType || undefined;
      const payId = req.body.payoutId || undefined;
      const regisStartTime = req.body.registrationBeforeStarttime || new Date();
      const tourStartTime = req.body.tournamentStartTime || new Date();
      let isAppliedWhitelist = req.body.isAppliedWhitelist;
      let isAppliedTokenlist = req.body.isAppliedTokenlist;
      const nftFileName = req.body.nftFileName;
      const date1 = new Date(regisStartTime).getTime();
      const date2 = new Date(tourStartTime).getTime();

      const r = (Math.random() + 1).toString(36).substring(7);
      // const c1 = String(isAddOnTime);
      // const c2 = String(isRebuy);
      const c3 = String(isReentry);
      const c4 = String(isLateRegisAllowed);
      const c5 = String(gtdEnable);
      // const c6 = String(isAddTimeBan);

      let entryFee: any;
      let houseFee: any;
      let totalEntryFee: any;
      let whiteListAddresses: any;
      let nftTokenListAddresses: any;
      if (isAppliedWhitelist) {
        whiteListAddresses = req.body.whiteListAddresses;
        if (whiteListAddresses.length === 0) {
          isAppliedWhitelist = false;
        }
      }

      if (isAppliedTokenlist) {
        nftTokenListAddresses = req.body.whiteListAddresses;
        if (nftTokenListAddresses.length === 0) {
          isAppliedTokenlist = false;
        }
      }

      if (tType === "satellite" || tType === "normal") {
        entryFee = req.body.entryFees || undefined;
        houseFee = req.body.houseFees || undefined;
        totalEntryFee = req.body.totalEntryFees || undefined;
      }
      // if (c1 === "false") {
      //   addOn = undefined;
      // }
      // if (c2 === "false") {
      //   rebuy = undefined;
      // }
      if (c3 === "false") {
        reentry = undefined;
      }
      if (c4 === "false") {
        lateRegistTime = undefined;
      }
      if (c5 === "false") {
        guaValue = undefined;
      }

      if (rebuyCondition && rebuyCondition > 100) {
        return (
          res.status(200).send({
            status: "Rebuy condition should not be greater than 100%",
          }),
          next(
            createError(404, "Rebuy condition should not be greater than 100%")
          )
        );
      }
      if (date1 > date2 || date1 === date2) {
        return (
          res.status(200).send({
            status:
              "Registration start time can not be greater than or equal to Tournament start time",
          }),
          next(
            createError(
              404,
              "Registration start time can not be greater than or equal to Tournament start time"
            )
          )
        );
      }
      if (
        Number(minPlayer) > Number(maxPlayer) ||
        Number(minPlayer) === Number(maxPlayer) ||
        Number(playerPerTab) > Number(maxPlayer)
      ) {
        return (
          res.status(200).send({
            status:
              "min player or player per table should not be greater than or equal to max player",
          }),
          next(
            createError(
              404,
              "min player or player per table should not be greater than or equal to max player"
            )
          )
        );
      } else {
        console.log("vao day");

        const tCreate = await tournamentRepo.createTournament({
          tournamentName: names,
          tournamentType: tType,
          // gameVariation: gVariation,
          type: Type,
          chipType: cType,
          startingChips: startChip,
          isGtdEnabled: gtdEnable,
          guaranteedValue: guaValue,
          turnTime: acTime,
          minPlayersToStart: minPlayer,
          maxPlayersAllowed: maxPlayer,
          playerPerTables: playerPerTab,
          entryFees: entryFee,
          houseFees: houseFee,
          totalHouseFees: houseFee,
          totalEntryFees: totalEntryFee,
          unregisterCutOffTime: unregisterCutTime,
          // isAddTimeBank: isAddTimeBan,
          // timeBank: timeBan,
          // timeBankRuleId: timeBankRuleid,
          tournamentId: r,
          betLevelStructureId,
          lateRegistrationAllowed: isLateRegisAllowed,
          lateRegistrationTime: lateRegistTime,
          isAppliedWhitelist,
          isAppliedTokenlist,
          whiteListAddresses,
          nftTokenListAddresses,
          nftFileName,
          // isAddonTimeEnabled: isAddOnTime,
          // isRebuyAllowed: isRebuy,
          isReentryAllowed: isReentry,
          // payoutType: payType,
          payoutId: payId,
          registrationBeforeStarttime: regisStartTime,
          tournamentStartTime: tourStartTime,
          rebuy,
          reentry,
          maxPlayersAtStart,
          addOn,
          createdAt: dateTime,
        });

        return res
          .status(200)
          .send({ status: "Tournament created successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let getListTournament = async (req: Request, res: Response, next) => {
  try {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const params = req.body;
    const data: any = {};

    if (params.playerNumber) {
      data.playerPerTables = params.playerNumber;
    }
    if (params.tournamentId) {
      data.tournamentId = params.tournamentId;
    }
    if (params.gameType) {
      // data.gameVariation = params.gameType;
      data.type = params.gameType;
    }
    if (params.tournamentType) {
      data.tournamentType = params.tournamentType;
    }
    if (params.state) {
      data.state = params.state;
    }
    if (params.isGtdEnabled === "true") {
      data.isGtdEnabled = true;
    }
    if (params.isGtdEnabled === "false") {
      data.isGtdEnabled = false;
    }
    if (params.isRebuyAllowed === "true") {
      data.isRebuyAllowed = true;
    }
    if (params.isRebuyAllowed === "false") {
      data.isRebuyAllowed = false;
    }
    if (params.isReentryAllowed === "true") {
      data.isReentryAllowed = true;
    }
    if (params.isReentryAllowed === "false") {
      data.isReentryAllowed = false;
    }
    if (params.isAddonTimeEnabled === "true") {
      data.isAddonTimeEnabled = true;
    }
    if (params.isAddonTimeEnabled === "false") {
      data.isAddonTimeEnabled = false;
    }
    if (params.startTime && params.endTime) {
      data.createdAt = {
        $gte: new Date(params.startTime).getTime(),
        $lt: new Date(params.endTime).getTime(),
      };
    }
    if (!params.startTime && params.endTime) {
      data.createdAt = {
        $lt: new Date(params.endTime).getTime(),
      };
    }
    if (params.startTime && !params.endTime) {
      data.createdAt = {
        $gte: new Date(params.startTime).getTime(),
      };
    }
    data.isDisabled = {
      $ne: true,
    };

    const totalCount = await tournamentRepo.totalCount(data);

    const result = await tournamentRepo.getTournaments(data, limit, page);

    if (result.length > 0) {
      if (config.encryptionEnable === true) {
        const encrypted = utils.encrypt(JSON.stringify(result));
        encrypted.then((encryptedData) => {
          if (result) {
            return res.status(200).send({
              data: encryptedData,
              totalCount,
              status: "success",
            });
          } else {
            return res.status(200).send({ status: "No item found" });
          }
        });
      } else {
        return res
          .status(200)
          .send({ data: result, totalCount, status: "success" });
      }
    } else {
      return res.status(200).send({ status: "No item found" });
    }
  } catch (error) {
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let getSearchList = async (req: Request, res: Response, next) => {
  try {
    const str = req.query.string || "";
    const data = await tournamentRepo.getSearchList(str);
    if (data.length === 0) {
      return res.status(200).send({ status: "No item found" });
    } else {
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
    }
  } catch (error) {
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let notNested = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const data = await tournamentRepo.notNested(id);
    if (data.length === 0) {
      return (
        res.status(200).send({ status: "No matched item found" }),
        next(createError(404, "No item found"))
      );
    } else {
      if (config.encryptionEnable === true) {
        const encrypted = utils.encrypt(JSON.stringify(data));
        encrypted.then((encryptedData) => {
          if (data) {
            return res
              .status(200)
              .send({ data: encryptedData, status: "success" });
          } else {
            return (
              res.status(404).send("bad request"),
              next(createError(404, "No item found"))
            );
          }
        });
      } else {
        return res.status(200).send({ data, status: "success" });
      }
    }
  } catch (error) {
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let getFilterList = async (req: Request, res: Response, next) => {
  try {
    const data: any = {};
    const params = await req.body;
    if (params.playerNumber) {
      // data.minPlayersToStart = { $lte: params.playerNumber };
      // data.maxPlayersAllowed = { $gte: params.playerNumber };
      data.playerPerTables = params.playerNumber;
    }
    if (params.tournamentId) {
      data.tournamentId = params.tournamentId;
    }
    if (params.gameType) {
      data.gameVariation = params.gameType;
    }
    if (params.tournamentType) {
      data.tournamentType = params.tournamentType;
    }
    if (params.state) {
      data.state = params.state;
    }
    if (params.isGtdEnabled === "true") {
      data.isGtdEnabled = true;
    }
    if (params.isGtdEnabled === "false") {
      data.isGtdEnabled = false;
    }
    if (params.isRebuyAllowed === "true") {
      data.isRebuyAllowed = true;
    }
    if (params.isRebuyAllowed === "false") {
      data.isRebuyAllowed = false;
    }
    if (params.isReentryAllowed === "true") {
      data.isReentryAllowed = true;
    }
    if (params.isReentryAllowed === "false") {
      data.isReentryAllowed = false;
    }
    if (params.isAddonTimeEnabled === "true") {
      data.isAddonTimeEnabled = true;
    }
    if (params.isAddonTimeEnabled === "false") {
      data.isAddonTimeEnabled = false;
    }
    if (params.startTime && params.endTime) {
      data.createdAt = {
        $gte: new Date(params.startTime).getTime(),
        $lt: new Date(params.endTime).getTime(),
      };
    }
    if (!params.startTime && params.endTime) {
      data.createdAt = {
        $lt: new Date(params.endTime).getTime(),
      };
    }
    if (params.startTime && !params.endTime) {
      data.createdAt = {
        $gte: new Date(params.startTime).getTime(),
      };
    }
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const totalCount = await tournamentRepo.totalCount(data);
    const result = await tournamentRepo.getTournaments(data, limit, page);
    if (result.length === 0) {
      return (
        res.status(200).send({ status: "No result found" }),
        next(createError(404, "No item found"))
      );
    } else {
      if (config.encryptionEnable === true) {
        const encrypted = utils.encrypt(JSON.stringify(result));
        encrypted.then((encryptedData) => {
          if (result) {
            return res
              .status(200)
              .send({ data: encryptedData, status: "success" });
          } else {
            return (
              res.status(404).send("bad request"),
              next(createError(404, "No item found"))
            );
          }
        });
      } else {
        return res
          .status(200)
          .send({ data: result, totalCount, status: "success" });
      }
    }
  } catch (error) {
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let getByTournamentId = async (req: Request, res: Response, next) => {
  try {
    const id = req.body.tournamentId;
    if (id) {
      const data = await getData(getTournamentByTournamentId(id));
      if (data) {
        res.status(200).send({ data, status: "success" });
      } else {
        const result = await tournamentCloseRepo.getByTournamentId(id);
        if (result.length === 0) {
          return (
            res.status(200).send({ status: "No matched item found" }),
            next(createError(404, "No item found"))
          );
        } else {
          if (config.encryptionEnable === true) {
            const encrypted = utils.encrypt(JSON.stringify(result));
            encrypted.then((encryptedData) => {
              if (result) {
                return res
                  .status(200)
                  .send({ data: encryptedData, status: "success" });
              } else {
                return (
                  res.status(404).send("bad request"),
                  next(createError(404, "No item found"))
                );
              }
            });
          } else {
            return res.status(200).send({ data: result, status: "success" });
          }
        }
      }
    }
  } catch (error) {
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let getAll = async (req: Request, res: Response, next) => {
  try {
    // db.collection("mycollection").find({});
    const data = await tournamentRepo.getAll();
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
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let getAllName = async (req: Request, res: Response, next) => {
  try {
    const data = await tournamentRepo.getAllName();
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
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let getOneTournament = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const data = await tournamentRepo.getTournament(id);
    if (data.length === 0) {
      return res.status(200).send({ status: "failed" });
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
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let cancel = async (req: Request, res: Response, next) => {
  try {
    const id = req.body.id;
    const data = await tournamentRepo.getTournamentCancel(id);

    if (data.length > 0) {
      const updateCancel = await tournamentRepo.updateTournament(id, {
        state: "CANCELED",
      });

      if (updateCancel) {
        res.status(200).send({ status: "CANCELED success" });
      } else {
        res.status(400).send({ status: false });
      }
    } else {
      return res
        .status(200)
        .send({ status: "Game State should be UPCOMING or REGISTER" });
    }
  } catch (error) {
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let updateTournament = async (req: Request, res: Response, next) => {
  try {
    const body = await req.body;

    const rebuy: any = {};
    rebuy.rebuyPrice = {};
    let reentry: any = {};
    reentry.reentryPrice = {};
    let addOn: any = {};
    const rebuyCondition = body.rebuyCondition
      ? (rebuy.rebuyCondition = body.rebuyCondition)
      : undefined;
    const rebuyChip = body.rebuyChip
      ? (rebuy.rebuyChip = body.rebuyChip)
      : undefined;
    const numberOfRebuy = body.numberOfRebuy
      ? (rebuy.numberOfRebuy = body.numberOfRebuy)
      : undefined;
    const lastRebuy = body.lastRebuy
      ? (rebuy.lastRebuy = body.lastRebuy)
      : undefined;
    const rebuyRealChip = body.rebuyRealChip
      ? (rebuy.rebuyPrice.rebuyRealChip = body.rebuyRealChip)
      : undefined;
    const rebuyVipPoint = body.rebuyVipPoint
      ? (rebuy.rebuyPrice.rebuyVipPoint = body.rebuyVipPoint)
      : undefined;
    const isRebuyTicket = body.isRebuyTicket
      ? (rebuy.rebuyPrice.isRebuyTicket = body.isRebuyTicket)
      : undefined;
    const rebuyAmount = body.rebuyAmount
      ? (rebuy.rebuyPrice.rebuyAmount = body.rebuyAmount)
      : undefined;
    const rebuyHouseFee = body.rebuyHouseFee
      ? (rebuy.rebuyPrice.rebuyHouseFee = body.rebuyHouseFee)
      : undefined;
    const totalRebuyChip = body.totalRebuyChip
      ? (rebuy.rebuyPrice.totalRebuyChip = body.totalRebuyChip)
      : undefined;
    const rebuyPoint = body.rebuyPoint
      ? (rebuy.rebuyPrice.rebuyPoint = body.rebuyPoint)
      : undefined;
    const rebuyTicket = body.rebuyTicket
      ? (rebuy.rebuyPrice.rebuyTicket = body.rebuyTicket)
      : undefined;
    const reentryChip = body.reentryChip
      ? (reentry.reentryChip = body.reentryChip)
      : undefined;
    const numberOfReentry = body.numberOfReentry
      ? (reentry.numberOfReentry = body.numberOfReentry)
      : undefined;
    const lastReentry = body.lastReentry
      ? (reentry.lastReentry = body.lastReentry)
      : undefined;
    const reentryRealChip = body.reentryRealChip
      ? (reentry.reentryPrice.reentryRealChip = body.reentryRealChip)
      : undefined;
    const reentryVipPoint = body.reentryVipPoint
      ? (reentry.reentryPrice.reentryVipPoint = body.reentryVipPoint)
      : undefined;
    const isreentryTicket = body.isReentryTicket
      ? (reentry.reentryPrice.isReentryTicket = body.isReentryTicket)
      : undefined;
    const reentryAmount = body.reentryAmount
      ? (reentry.reentryPrice.reentryAmount = body.reentryAmount)
      : undefined;
    const reentryHouseFee = body.reentryHouseFee
      ? (reentry.reentryPrice.reentryHouseFee = body.reentryHouseFee)
      : undefined;
    const totalReentryChip = body.totalReentryChip
      ? (reentry.reentryPrice.totalReentryChip = body.totalReentryChip)
      : undefined;
    const reentryPoint = body.reentryPoint
      ? (reentry.reentryPrice.reentryPoint = body.reentryPoint)
      : undefined;
    const reentryTicket = body.reentryTicket
      ? (reentry.reentryPrice.reentryTicket = body.reentryTicket)
      : undefined;
    const numberOfAddOn = body.numberOfAddOn
      ? (addOn.numberOfAddOn = body.numberOfAddOn)
      : undefined;
    const addOnPrice = body.addOnPrice
      ? (addOn.addOnPrice = body.addOnPrice)
      : undefined;
    const addOnChip = body.addOnChip
      ? (addOn.addOnChip = body.addOnChip)
      : undefined;
    const addOnTime = body.addOnTime
      ? (addOn.addOnTime = Object.values(body.addOnTime))
      : undefined;
    const id = req.params.id;
    const names = req.body.tournamentName || undefined;
    const tType = req.body.tournamentType || undefined;
    const maxPlayersAtStart = req.body.maxPlayersAtStart || 0;
    // const gVariation = req.body.gameVariation || undefined;
    const type = req.body.type || undefined;
    const cType = req.body.chipType || undefined;
    const startChip = req.body.startingChips || undefined;
    const gtdEnable = req.body.isGtdEnabled ?? undefined;
    let guaValue = req.body.guaranteedValue || undefined;
    const acTime = req.body.turnTime || undefined;
    const minPlayer = req.body.minPlayersToStart || undefined;
    const maxPlayer = req.body.maxPlayersAllowed || undefined;
    const playerPerTab = req.body.playerPerTables || undefined;
    const unregisterCutTime = req.body.unregisterCutOffTime || undefined;
    // const isAddTimeBan = req.body.isAddTimeBank ?? undefined;
    // const timeBan = req.body.timeBank || undefined;
    // const timeBankRuleid = req.body.timeBankRuleId || undefined;
    const betStructureid = req.body.betLevelStructureId || undefined;
    const isLateRegisAllowed = req.body.lateRegistrationAllowed ?? undefined;
    let lateRegistTime = req.body.lateRegistrationTime || undefined;
    const isAddOnTime = req.body.isAddonTimeEnabled ?? undefined;
    // const isRebuy = req.body.isRebuyAllowed ?? undefined;
    const isReentry = req.body.isReentryAllowed ?? undefined;
    const payType = req.body.payoutType || undefined;
    const payId = req.body.payoutId || undefined;
    const regisStartTime = req.body.registrationBeforeStarttime || new Date();
    const tourStartTime = req.body.tournamentStartTime || new Date();
    const date1 = new Date(regisStartTime).getTime();
    const date2 = new Date(tourStartTime).getTime();

    const c1 = String(isAddOnTime);
    // const c2 = String(isRebuy);
    const c3 = String(isReentry);
    const c4 = String(isLateRegisAllowed);
    const c5 = String(gtdEnable);
    // const c6 = String(isAddTimeBan);

    let entryFee: any;
    let houseFee: any;
    let totalEntryFee: any;
    if (tType === "satellite" || tType === "normal") {
      entryFee = req.body.entryFees || undefined;
      houseFee = req.body.houseFees || undefined;
      totalEntryFee = req.body.totalEntryFees || undefined;
    }

    if (c1 === "false") {
      addOn = undefined;
    }
    // if (c2 === "false") {
    //   rebuy = undefined;
    // }
    if (c3 === "false") {
      reentry = undefined;
    }
    if (c4 === "false") {
      lateRegistTime = undefined;
    }
    if (c5 === "false") {
      guaValue = undefined;
    }
    // if (c6 === "false") {
    //   timeBan = undefined;
    // }
    if (date1 > date2 || date1 === date2) {
      return (
        res.status(200).send({
          status:
            "Registration start time can not be greater than or equal to Tournament start time",
        }),
        next(
          createError(
            404,
            "Registration start time can not be greater than or equal to Tournament start time"
          )
        )
      );
    }
    if (rebuyCondition && rebuyCondition > 100) {
      return (
        res
          .status(200)
          .send({ status: "Rebuy condition should not be greater than 100%" }),
        next(
          createError(404, "Rebuy condition should not be greater than 100%")
        )
      );
    }
    if (
      Number(minPlayer) > Number(maxPlayer) ||
      Number(minPlayer) === Number(maxPlayer) ||
      Number(playerPerTab) > Number(maxPlayer)
    ) {
      return (
        res.status(200).send({
          status:
            "min player or player per table should not be greater than or equal to max player",
        }),
        next(
          createError(
            404,
            "min player or player per table should not be greater than or equal to max player"
          )
        )
      );
    } else {
      await tournamentRepo.updateTournament(id, {
        tournamentName: names,
        tournamentType: tType,
        type,
        chipType: cType,
        startingChips: startChip,
        isGtdEnabled: gtdEnable,
        guaranteedValue: guaValue,
        turnTime: acTime,
        maxPlayersAtStart,
        minPlayersToStart: minPlayer,
        maxPlayersAllowed: maxPlayer,
        playerPerTables: playerPerTab,
        entryFees: entryFee,
        houseFees: houseFee,
        totalEntryFees: totalEntryFee,
        unregisterCutOffTime: unregisterCutTime,
        // isAddTimeBank: isAddTimeBan,
        // timeBank: timeBan,
        // timeBankRuleId: timeBankRuleid,
        betLevelStructureId: betStructureid,
        lateRegistrationAllowed: isLateRegisAllowed,
        lateRegistrationTime: lateRegistTime,
        isAddonTimeEnabled: isAddOnTime,
        addOn,
        // isRebuyAllowed: isRebuy,
        isReentryAllowed: isReentry,
        // payoutType: payType,
        payoutId: payId,
        registrationBeforeStarttime: regisStartTime,
        tournamentStartTime: tourStartTime,
        rebuy,
        reentry,
      });

      await tournamentRepo.updateTournamentId(id);

      return res
        .status(200)
        .send({ status: "Tournament updated successfully" });
    }
  } catch (error) {
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export let deleteOne = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const deleteTournament = await tournamentRepo.deleteTournament(id);

    if (deleteTournament) {
      res.status(200).send({ status: "deleted item" });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    return (
      res.status(500).send("InternalServerError"),
      next(createError(500, "InternalServerError"))
    );
  }
};

export const changeStatus = async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;

    if (id) {
      const event = {
        eventName: "TournamentPublishedByAdmin",
        data: { id },
      };

      await redis.xadd(
        tournamentWebServer.inStream,
        "*",
        "data",
        JSON.stringify(event)
      );

      const data = await tournamentRepo.updateTournament(id, {
        state: "PUBLISHED",
        gameState: "PUBLISHED",
      });

      if (data) {
        return res.status(200).send({ status: "Change Status Successfully" });
      }
    } else {
      return res.status(400).send({ status: "Can't find id" });
    }
  } catch {
    return res.status(500).send({ status: "Change Status Failed" });
  }
};

export const getOneTournamentFromRedis = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const data = await getData(getTournamentPath(id));

    if (data) {
      res.status(200).send({ data, status: "Get Data Successfully" });
    } else {
      res.status(200).send({ status: "No matched item found" });
    }
  } catch (err) {
    return res.status(200).send({ status: "Get Data Failed" });
  }
};

export const getOneTournamentFromClosed = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    const data = await tournamentCloseRepo.getTournamentClose(id);
    if (data) {
      res.status(200).send({ data, status: true });
    } else {
      res.status(200).send({ status: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false });
  }
};
