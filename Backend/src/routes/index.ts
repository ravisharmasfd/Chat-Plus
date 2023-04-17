import express, { Router } from "express";
import userRouter from './user'
import authRouter from './auth'
import chatRouter from './chat'
const router: Router = express.Router();

router.use('/auth',authRouter);
router.use("/user",userRouter);
router.use("/chat",chatRouter);

export default router