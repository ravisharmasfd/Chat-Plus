import express, { Router } from "express";
import { addMember, addMessage, createChat, createGroup, getAllChats, getGroup, getMessages, removeMember } from "../controllers/chat";
const router: Router = express.Router();

router.post("/member/:id",addMember as any)
router.post("/remove/:id",removeMember as any)
router.post("/group",createGroup as any);
router.get("/group/:id", getGroup as any)
router.post("/message" ,addMessage as any)
router.get("/message/:chatId", getMessages as any)
router.post('/', createChat as any)
router.get('/' , getAllChats as any)

export default router