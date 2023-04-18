import { Response } from "express";
import { ReqUser } from "../types";
import sequelize from "../database";
import { Chat } from "../models/ChatChannel";
import { Op, QueryTypes, Sequelize, Transaction } from "sequelize";
import { ChatUsers } from "../models/ChatUser";
import { Message } from "../models/Message";
import { User } from "../models/User";

export const createChat = async (req: ReqUser, res: Response) => {
  try {
    const trans: Transaction = await sequelize.transaction();
    try {
      const { email, phone } = req.body;
      let person: any;

      if (email) {
        person = await User.findOne({ where: { email } });
      } else if (phone) {
        person = await User.findOne({ where: { phone } });
      } else {
        res.status(400).json({ Message: "data is required" });
        return;
      }
      if (!person || !person.id) {
        res.status(404).json({ Message: "User not found" });
        return;
      }
      if (person.id == req.user.id) {
        res.status(400).json({ Message: "you can not chat with yourself" });
        return;
      }
      const previousChat: any = await ChatUsers.findOne({
        where: {
          userId: [req.user.id, person.id],
        },
        attributes: ["chatId"],
        group: ["chatId"],
        having: Sequelize.literal(`COUNT(DISTINCT userId) = 2`),
      });
      if (previousChat) {
        res.json({ id: previousChat.chatId });
        return;
      }
      const chat: any = await Chat.create(
        { group: false },
        { transaction: trans }
      );
      await ChatUsers.create(
        { chatId: chat.id, userId: req.user.id },
        { transaction: trans }
      );
      await ChatUsers.create(
        { chatId: chat.id, userId: person.id },
        { transaction: trans }
      );
      trans.commit();
      res.json(chat);
    } catch (error) {
      trans.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ Message: "Server Error" });
  }
};
export const getAllChats = async (req: ReqUser, res: Response) => {
  try {
    // Find all chats for the given userId
    const uId = req.user.id;

    const result = await sequelize.query(
      "select * from (select t3.chatId as chatId, t3.userId as userId , users.name , users.email , users.phone from (select t1.chatId as chatId,t2.userId as userId from (select chatId from `chat_users` where userId = :uId) as t1 inner join `chat_users` as t2 on t1.chatId = t2.chatId where not userId = :uId) as t3 inner join users on t3.userId = users.id) as t4 inner join chats on t4.chatId = chats.id",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: { uId },
      }
    );
    // const result = await ChatUsers.findAll({
    //   attributes: ['chatId', 'userId'],
    //   where: {
    //     userId: userId,
    //   },
    //   include: [
    //     {
    //       model: ChatUsers,
    //       attributes: ['userId'],
    //       where: {
    //         userId: {
    //           [Op.not]: userId,
    //         },
    //       },
    //     },
    //     {
    //       model: User,
    //       attributes: ['name', 'email', 'phone'],
    //     },
    //   ],
    //   raw: true,
    // });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
export const addMessage = async (req: ReqUser, res: Response) => {
  try {
    const { chatId, text } = req.body;
    const cId = parseInt(chatId);
    if(isNaN(cId)){
      res.status(404).json("not alllowed");
      return
    }
    console.log("BOdy", req.body);
    const userChat = ChatUsers.findAll({
      where: { chatId:cId, userId: req.user.id },
    });
    if (!userChat) {
      res.status(404).json({ Message: "you can't message" });
      return;
    }
    const msg = await Message.create({
      chatId: cId,
      userId: req.user.id as number,
      text,
    });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ Message: "Server Error" });
  }
};
export const getMessages = async (req: ReqUser, res: Response) => {
  try {
    const { chatId } = req.params;
    const cId = parseInt(chatId);
    if(isNaN(cId)){
      res.status(404).json("not alllowed");
      return
    }
    const chatUser = await ChatUsers.findOne({
      where: { chatId: cId, userId: req.user.id },
    });
    if (!chatUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const messages = await sequelize.query(
      "SELECT t.text,t.chatId,t.userId,t.createdAt,users.name FROM (SELECT * FROM messages where chatId=:cId) AS t INNER JOIN users ON t.userId = users.id ",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: { cId },
      }
    );
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
