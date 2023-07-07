import mongoose, { Document, Schema } from "mongoose";
import { IPayout } from "../utils/Types";

const PayoutSchema: Schema = new Schema({
  payoutName: { type: String, required: true },
  created_at: { type: Date },
});

export default mongoose.model<IPayout>("Payout", PayoutSchema);
