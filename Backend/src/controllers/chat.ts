import { Response } from "express";
import { ReqUser } from "../types";
import sequelize from "../database";
import { Chat } from "../models/ChatChannel";
import { Transaction } from "sequelize";
import { ChatUsers } from "../models/ChatUser";
import { Message } from "../models/Message";

export const createChat = async (req:ReqUser, res:Response)=>{
    try {
        const trans: Transaction= await sequelize.transaction();
        const chat:any = await Chat.create({group:false},{transaction:trans});
        await ChatUsers.create({chatId:chat.id,userId:req.user.id},{transaction:trans})
        await ChatUsers.create({chatId:chat.id,userId:Number(req.params.id)},{transaction:trans})
        trans.commit();
        res.json(chat);
    } catch (error) {
        res.status(500);
    }
}

export const addMessage =async (req:ReqUser,res:Response) => {
    try {
        const {chatId , userId , text} = req.body;
        const userChat = ChatUsers.findAll({where:{chatId,userId}})
        if(!userChat) res.status(404)
        const msg = await Message.create({
            chatId: Number(chatId),
            userId: Number(chatId),
            text,
        })
        res.json(msg)
    }catch(error){
        res.status(500);
    }

}