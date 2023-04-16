import { Response } from "express";
import { reqUser } from "../types";

export const getUser = async (req: reqUser, res: Response) => {
  try {
    res.json({ email: req.user.email , name: req.user.email , phone: req.user.phone });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
