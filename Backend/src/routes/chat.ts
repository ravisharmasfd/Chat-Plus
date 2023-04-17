import express, { Router } from "express";
import userRouter from './user'
import authRouter from './auth'
import { addMessage, createChat } from "../controllers/chat";
import { authMiddleware } from "../middleware/auth";
const router: Router = express.Router();

router.post('/chat/:id',authMiddleware, createChat)
router.post("/message",authMiddleware,addMessage)

export default router