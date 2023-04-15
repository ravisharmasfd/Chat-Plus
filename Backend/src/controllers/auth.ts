import {User, UserAttributes} from "../models/User"
import { Request,Response } from "express";
import bcrypt from 'bcrypt'
import { Op } from "sequelize";
const saltRounds = 10;
export const signUpController =async (req:Request,res:Response) => {
    try {
        const { email, name, password,phone } = req.body as UserAttributes;
        console.log(req.body)
        if (!email || !password || !name || !phone) {
          res.status(400).json({ message: "Check your credential" });
        }
        const FindUser = await User.findOne({ where: {
          [Op.or]:[
            { email: email },
            { phone: phone }
          ]
        } });
    
        if (FindUser) {
          res.status(401).json({ message: "User already exists" });
        } else {
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(password, salt);
    
          const user = await User.create({
            email,
            password: hash,
            name,
            phone
          });
    
          // Send success response
          res.status(200).json({ message: "User created successfully!" });
        }
      } catch (error) {
        // Send error response
        res.status(500).json({ message: "Server error" });
      }
}