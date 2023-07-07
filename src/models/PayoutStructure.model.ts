import mongoose, { Document, Schema } from "mongoose";
import { IPayoutStructure } from "../utils/Types";

const PayoutStructureSchema: Schema = new Schema({
  playerRange: { type: String },
  created_at: { type: Date },
  numberOfWinners: { type: Number },
  minPlayers: { type: Number },
  maxPlayers: { type: Number },
  payoutRecord: [
    {
      _id: { type: Number },
      playerRank: { type: String },
      playerPayout: { type: Number },
    },
  ],
  payoutStructureId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Payout",
  },
  code: { type: String },
});

export default mongoose.model<IPayoutStructure>(
  "payoutStructure",
  PayoutStructureSchema,
  "payoutStructure"
);
