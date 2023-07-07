import User from "../models/User.model";
import * as common from "../utils/common.util";
import { IUserType } from "../utils/Types";
export const getExistUser = (username: string) => {
  return User.findOne({ username });
};

export const createNewUser = async (data: IUserType) => {
  const { username, password } = data;
  const passwordHash = common.encryptPassword(password);
  const newUser = new User({
    username,
    password: passwordHash,
  });
  return await newUser.save();
};
