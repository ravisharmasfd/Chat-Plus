import { NextFunction, Request, Response } from "express"
import { UserAttributes } from "../models/User"
import { Model } from "sequelize"
export interface jwtPayload{
    userId:number
}
export interface ReqUser extends Request{
    user: UserAttributes
}
export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>