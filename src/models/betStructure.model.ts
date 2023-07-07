import mongoose, { Document, Schema } from "mongoose";
import { IBetStructureType } from "../utils/Types";

const BettructureSchema: Schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    type: { type: String },
    betList: [
      {
        level: { type: Number },
        ante: { type: Number },
        bet: { type: Number },
        lastBet: { type: Number },
        betAdder: { type: Number },
        time: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IBetStructureType>(
  "betStructure",
  BettructureSchema,
  "betStructure"
);
