import { User, UserAttributes } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env";
const saltRounds = 10;
export const signUpController = async (req: Request, res: Response) => {
  try {
    const { email, name, password, phone } = req.body as UserAttributes;
    if (!email || !password || !name || !phone) {
      res.status(400).json({ message: "Check your credential" });
    }
    const FindUser = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone: phone }],
      },
    });

    if (FindUser) {
      res.status(401).json({ message: "User already exists" });
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      await User.create({
        email,
        password: hash,
        name,
        phone,
      });

      // Send success response
      res.status(200).json({ message: "User created successfully!" });
    }
  } catch (error) {
    // Send error response
    res.status(500).json({ message: "Server error" });
  }
};
export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserAttributes;
    if (!email || !password) {
      res.status(400).json({ message: "Check your credential" });
    }
    const FindUser = (await User.findOne({
      where: { email },
    })) as UserAttributes | null;
    if (FindUser) {
      if (bcrypt.compareSync(password, FindUser.password)) {
        // Send success response
        const token: string = jwt.sign({ userId: FindUser.id }, jwtSecret);
        res
          .status(200)
          .json({
            message: "Sign in Successfully",
            token,
            user: {
              email: FindUser.email,
              id: FindUser.id,
              name: FindUser.name,
              phone: FindUser.phone,
            },
          });
      } else {
        res.status(401).json({ message: "Check your password" });
      }
    } else {
      // Send error response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Send error response
    res.status(500).json({ message: "Server error" });
  }
};
