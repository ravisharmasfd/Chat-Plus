import express, { Router } from "express";
import userRouter from './user'
import authRouter from './auth'
const router: Router = express.Router();

router.use('/auth',authRouter)
router.use("/user",userRouter)

export default router