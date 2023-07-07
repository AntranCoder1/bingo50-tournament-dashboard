import { NextFunction } from "connect";
import { Request, Response } from "express";
import createError from "http-errors";
import * as jwtUtil from "../utils/jwt.util";
const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.user) {
    if (req.body.user.role === "member") {
      res.status(401);
      res.send("Unauthorized");
      return next(createError(401, "Unauthorized"));
    } else if (req.body.user.role === "admin") {
      next();
    }
  }
};

export default admin;
