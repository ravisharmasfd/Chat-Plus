import express, { Router } from "express";
import { addMessage, createChat, getAllChats, getMessages } from "../controllers/chat";
const router: Router = express.Router();

router.post('/', createChat as any)
router.post("/message" ,addMessage as any)
router.get('/' , getAllChats as any)
router.get("/message/:chatId", getMessages as any)

export default router