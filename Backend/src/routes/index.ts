import express, { Router } from "express";
import userRouter from './user'
import authRouter from './auth'
import chatRouter from './chat'
import { authMiddleware } from "../middleware/auth";
import { MiddlewareFunction } from "../types";
const router: Router = express.Router();

router.use('/auth',authRouter);
router.use("/user",userRouter);
router.use("/chat",authMiddleware as MiddlewareFunction, chatRouter);

export default router