import mongoose, { Document, Schema } from "mongoose";
import { ITournament } from "../utils/Types";

const TournamentSchema: Schema = new Schema({
  tournamentName: { type: String, required: true },
  tournamentId: { type: String },
  tournamentType: { type: String },
  // gameVariation: { type: String },
  type: { type: String },
  gameState: { type: String, default: "UPCOMING" },
  state: { type: String, default: "UPCOMING" },
  chipType: { type: String },
  startingChips: { type: Number },
  isGtdEnabled: { type: Boolean },
  guaranteedValue: { type: Number },
  // actionTime: { type: String },
  turnTime: { type: String },
  minPlayersToStart: { type: Number },
  maxPlayersAllowed: { type: Number },
  playerPerTables: { type: Number },
  entryFees: { type: Number },
  maxPlayersAtStart: { type: Number },
  houseFees: { type: Number },
  totalEntryFees: { type: Number },
  unregisterCutOffTime: { type: Number },
  timeBank: { type: Number },
  isAddTimeBank: { type: Boolean },
  // timeBankRuleId: { type: Schema.Types.ObjectId, ref: "timeBankRule" },
  // blindRuleId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: "blindRule",
  // },
  betLevelStructureId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "betStructure",
  },
  lateRegistrationAllowed: { type: Boolean },
  lateRegistrationTime: { type: Number },
  isAddonTimeEnabled: { type: Boolean },
  addOn: {
    numberOfAddOn: { type: Number },
    addOnPrice: { type: Number },
    addOnChip: { type: Number },
    addOnTime: [],
  },
  isRebuyAllowed: { type: Boolean },
  isReentryAllowed: { type: Boolean },
  payoutType: { type: String },
  payoutId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "payoutStructure",
  },
  createdAt: { type: Number },
  registrationBeforeStarttime: { type: String },
  tournamentStartTime: { type: String },
  rebuy: {
    rebuyCondition: { type: Number },
    rebuyChip: { type: Number },
    numberOfRebuy: { type: Number },
    lastRebuy: { type: Number },
    rebuyPrice: {
      rebuyRealChip: { type: Boolean },
      rebuyVipPoint: { type: Boolean },
      isRebuyTicket: { type: Boolean },
      rebuyAmount: { type: Number },
      rebuyHouseFee: { type: Number },
      totalRebuyChip: { type: Number },
      rebuyPoint: { type: Number },
      rebuyTicket: { type: Number },
    },
  },
  reentry: {
    reentryChip: { type: Number },
    numberOfReentry: { type: Number },
    lastReentry: { type: Number },
    reentryPrice: {
      reentryRealChip: { type: Boolean },
      reentryVipPoint: { type: Boolean },
      isReentryTicket: { type: Boolean },
      reentryAmount: { type: Number },
      reentryHouseFee: { type: Number },
      totalReentryChip: { type: Number },
      reentryPoint: { type: Number },
      reentryTicket: { type: Number },
    },
  },
});

// Export the model and return your IUser interface
export default mongoose.model<ITournament>(
  "tournament",
  TournamentSchema,
  "tournament"
);
