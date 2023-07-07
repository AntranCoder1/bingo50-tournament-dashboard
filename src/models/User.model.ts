import mongoose, { Schema } from "mongoose";
import { IUserType } from "../utils/Types";

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    min: [4, "Too short, min 4 characters are required"],
    max: [32, "Too long, max 16 characters are required"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Export the model and return your IUser interface
export default mongoose.model<IUserType>("User", UserSchema);
