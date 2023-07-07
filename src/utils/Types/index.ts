import { ObjectId } from "mongodb";
import { mongoose } from "mongoose";
export interface ITablesType {
  _id?: ObjectId;
  id: string;
  name: string;
  type: string;
  anteAmount: number;
  betAmount: number;
  freezeBetMultiplier?: number;
  rake?: any;
  maxPlayers: number;
  minBuyIn: number;
  maxBetMultiplier?: number;
  maxBetAdder?: number;
  turnTime: number;
  turnReducedTimeMultiplier: number;
  sitOutTime: number;
  status?: string;
  numberOfBots?: number;
  roundCounter: number;
  communityCards: {
    B: any[];
    I: any[];
    N: any[];
    G: any[];
    O: any[];
  };
  players: any;
  mainPot: number;
  sidePots: any[];
  deck: any;
}

export interface IUserType {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface IParamsCalcActivity {
  partialRakeYesterday?: number;
  partialRakeToday?: number;
  startDate?: number;
  endDate?: number;
  sumOfRake?: number;
  partialRakeLastWeek?: number;
  averageRakeThisWeek?: number;
  partialRakeThisWeek?: number;
  partialRakeThisMonth?: number;
  averageRakeThisMonth?: number;
  sumOfChips?: number;
}

export interface IBetStructureArr {
  level?: number;
  ante?: number;
  bet?: number;
  lastBet?: number;
  betAdder?: number;
  time?: number;
}

export interface IBetStructureType {
  name: string;
  description: string;
  type?: string;
  betList: IBetStructureArr[];
}

export interface IPayout {
  payoutName: string;
  created_at: Date;
}

export interface IPayoutStructureType {
  _id: number;
  playerRank: string;
  playerPayout: number;
}

export interface IPayoutStructure {
  playerRange: string;
  created_at: Date;
  numberOfWinners: number;
  minPlayers: number;
  maxPlayers: number;
  payoutRecord: IPayoutStructureType[];
  code: string;
}

export interface IStage {
  stage: number;
  name: string;
  actionTime: number;
  timeBank: number;
  prize: number;
  minPlayersToStart: number;
  playerPerTables: number;
  startingChips: number;
  entryFees: number;
  houseFees: number;
  payoutType: string;
}

export interface ITournamentAddOn {
  numberOfAddOn: number;
  addOnPrice: number;
  addOnChip: number;
  addOnTime: [];
}

export interface IRebuyPrice {
  rebuyRealChip: boolean;
  rebuyVipPoint: boolean;
  isRebuyTicket: boolean;
  rebuyAmount: number;
  rebuyHouseFee: number;
  totalRebuyChip: number;
  rebuyPoint: number;
  rebuyTicket: number;
}

export interface ITournamentRebuy {
  rebuyCondition: number;
  rebuyChip: number;
  numberOfRebuy: number;
  lastRebuy: number;
  rebuyPrice: IRebuyPrice;
}

export interface ITournamentReentryPrice {
  reentryRealChip: boolean;
  reentryVipPoint: boolean;
  isReentryTicket: boolean;
  reentryAmount: number;
  reentryHouseFee: number;
  totalReentryChip: number;
  reentryPoint: number;
  reentryTicket: number;
}
export interface ITournamentReentry {
  reentryChip: number;
  numberOfReentry: number;
  lastReentry: number;
  reentryPrice: ITournamentReentryPrice;
}

export interface ITournamentCloseReentryPrice {
  chips: boolean;
  reentryChips: number;
  reentryHouseChips: number;
}

export interface ITournament {
  tournamentName: string;
  tournamentId: string;
  tournamentType: string;
  // gameVariation: string;
  type: string;
  gameState: string;
  state: string;
  chipType: string;
  startingChips: number;
  isGtdEnabled: boolean;
  guaranteedValue: number;
  // actionTime: string;
  turnTime: string;
  minPlayersToStart: number;
  maxPlayersAllowed: number;
  playerPerTables: number;
  entryFees: number;
  maxPlayersAtStart: number;
  houseFees: number;
  totalEntryFees: number;
  unregisterCutOffTime: number;
  timeBank: number;
  isAddTimeBank: boolean;
  // timeBankRuleId: { type: mongoose.Schema.Types.ObjectId; ref: "timeBankRule" };
  betLevelStructureId: {
    type: mongoose.Schema.Types.ObjectId;
    required: true;
    ref: "betStructure";
  };
  // betRuleId: string;
  lateRegistrationAllowed: boolean;
  lateRegistrationTime: number;
  isAddonTimeEnabled: boolean;
  // addOn: ITournamentAddOn;
  isRebuyAllowed: boolean;
  isReentryAllowed: boolean;
  // payoutType: string;
  payoutId: {
    type: mongoose.Schema.Types.ObjectId;
    required: true;
    ref: "payoutStructure";
  };
  createdAt: number;
  registrationBeforeStarttime: string;
  tournamentStartTime: string;
  rebuy: ITournamentRebuy;
  reentry: ITournamentReentry;
}

export interface ITournamentClose {
  tournamentName: string;
  tournamentId: string;
  tournamentType: string;
  gameVariation: string;
  gameState: string;
  chipType: string;
  startingChips: number;
  isGtdEnabled: boolean;
  guaranteedValue: number;
  actionTime: string;
  minPlayersToStart: number;
  maxPlayersAllowed: number;
  playerPerTables: number;
  entryFees: number;
  houseFees: number;
  totalEntryFees: number;
  unregisterCutOffTime: number;
  timeBank: number;
  isAddTimeBank: boolean;
  timeBankRuleId: { type: mongoose.Schema.Types.ObjectId; ref: "timeBankRule" };
  blindRuleId: {
    type: mongoose.Schema.Types.ObjectId;
    required: true;
    ref: "blindRule";
  };
  lateRegistrationAllowed: boolean;
  lateRegistrationTime: number;
  isAddonTimeEnabled: boolean;
  addOn: ITournamentAddOn;
  isRebuyAllowed: boolean;
  isReentryAllowed: boolean;
  payoutType: string;
  payoutId: {
    type: mongoose.Schema.Types.ObjectId;
    required: true;
    ref: "payoutStructure";
  };
  createdAt: number;
  registrationBeforeStarttime: string;
  tournamentStartTime: string;
  rebuy: ITournamentRebuy;
  reentryPrice: ITournamentCloseReentryPrice;
  reentry: ITournamentReentry;
  player_list: {};
  totalReentry: number;
}
