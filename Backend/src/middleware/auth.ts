import { NextFunction, Response } from "express";
import { User, UserAttributes } from "../models/User";
import { jwtSecret } from "../config/env";
import jwt from "jsonwebtoken";
import { Model } from "sequelize";
import { jwtPayload, ReqUser } from "../types";


export const authMiddleware = async (req:ReqUser, res:Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const authorHead: string[] = authorization.split(" ");
      if (authorHead[0] !== "Bearer") {
        res.status(401).json({ msg: "You are not authorize" });
        return;
      }
      const token = authorHead[1];
      const { userId } = await jwt.verify(token, jwtSecret) as jwtPayload;
      const user:Model<UserAttributes, UserAttributes>|null= await User.findOne({ where: { id: userId } });
      if (!user) {
        res.status(401).json({ msg: "You are not authorized" });
        return;
      }
      req.user = user as any;
      next();
    } else {
      res.status(401).json({ msg: "You are not authorize" });
    }
  } catch (error) {
    res.status(401).json({ msg: "You are not authorize" });
  }
};