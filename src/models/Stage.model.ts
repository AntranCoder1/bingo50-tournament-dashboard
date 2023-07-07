import mongoose, { Document, Schema } from "mongoose";
import { IStage } from "../utils/Types";

const StageSchema: Schema = new Schema({
  stage: { type: Number, required: true },
  name: { type: String, required: true },
  actionTime: { type: Number },
  timeBank: { type: Number },
  prize: { type: Number },
  minPlayersToStart: { type: Number },
  playerPerTables: { type: Number },
  startingChips: { type: Number },
  entryFees: { type: Number },
  houseFees: { type: Number },
  //   blindStructureId: {
  //     type: Schema.Types.ObjectId,
  //     required: true,
  //     ref: "blindRule",
  //   },
  payoutType: { type: String },
  payoutId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "payoutStructure",
  },
  isPublished: { type: Boolean, default: false },
});

// Export the model and return your IUser interface
export default mongoose.model<IStage>("stage", StageSchema, "stage");
