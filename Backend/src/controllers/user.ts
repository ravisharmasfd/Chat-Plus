import { Response } from "express";
import { ReqUser } from "../types";

export const getUser = async (req: ReqUser, res: Response) => {
  try {
    res.json({ email: req.user.email , name: req.user.name , phone: req.user.phone, id:req.user.id});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
