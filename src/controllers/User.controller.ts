import { Request, Response } from "express";
import * as UserRepo from "../repositories/User.repo";
import * as common from "../utils/common.util";
import * as jwtUtil from "../utils/jwt.util";
import { IUserType } from "../utils/Types";
export const Login = async (req: Request, res: Response) => {
  try {
    const { username, password }: IUserType = req.body;
    const checkUser = await UserRepo.getExistUser(username);
    if (checkUser) {
      const checkHashPassword = common.comparePassword(
        checkUser.password,
        password
      );

      if (checkHashPassword) {
        const token = jwtUtil.sign({
          _id: checkUser._id,
          username: checkUser.username,
        });
        res.status(200).send({ status: true, data: token });
      } else {
        res.status(400).json({ message: "Email or password is incorrect" });
      }
    } else {
      res.status(400).json({ message: "Email or password is incorrect" });
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    const { username, password, confirmPassword }: IUserType = req.body;

    const userExist = await UserRepo.getExistUser(username);
    if (userExist) {
      res.status(400);
      res.json({ message: "Email already exists" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400);
      res.json({ message: "Confirm Password does not match" });
      return;
    }

    if (!username || !password || !confirmPassword) {
      res.status(400);
      res.json({ message: "Please enter full information" });
      return;
    }

    const dataSendCreate: IUserType = {
      username,
      password,
    };

    const createUser = await UserRepo.createNewUser(dataSendCreate);

    if (createUser) {
      res.status(200).send({ status: true });
    } else {
      res.status(400).send({ status: false });
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
