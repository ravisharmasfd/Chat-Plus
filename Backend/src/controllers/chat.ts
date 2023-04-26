import { Response } from "express";
import { ReqUser } from "../types";
import sequelize from "../database";
import { Chat } from "../models/ChatChannel";
import { Model, Op, QueryTypes, Sequelize, Transaction } from "sequelize";
import { ChatUsers } from "../models/ChatUser";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { Group, GroupAttributes } from "../models/Group";

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
      res.json({chatId:chat.id,
        name:person.name,
        email:person.email,
        phone:person.phone,
        userId:person.id,
        group:0,});
    } catch (error) {
      trans.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ Message: "Server Error" });
  }
};
export const createGroup = async (req: ReqUser, res: Response) => {
  try {
    const trans: Transaction = await sequelize.transaction();
    try {
      const { name } = req.body;
      if(name.length < 3){
        res.status(400).json({ Message: "Group name is too short" });
        return;
      }
      const chat: any = await Chat.create(
        { group: true },
        { transaction: trans }
      );
      await ChatUsers.create(
        { chatId: chat.id, userId: req.user.id },
        { transaction: trans }
      );
      const group:any = await Group.create({
        name,
        chatId: chat.id,
        admin:req.user.id,
      },{ transaction: trans })
      trans.commit();
      res.json({chatId:chat.id,name:group.name,email:req.user.email,phone:req.user.phone,group:1,admin:req.user.id});
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
      "select * from (select t3.chatId as chatId, t3.userId as userId , users.name , users.email , users.phone from (select t1.chatId as chatId,t2.userId as userId from (select chatId from `chat_users` where userId = :uId) as t1 inner join `chat_users` as t2 on t1.chatId = t2.chatId where not userId = :uId) as t3 inner join users on t3.userId = users.id) as t4 inner join (select * from chats where chats.group = 0) as t5 on t4.chatId = t5.id",
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
    const groupResult = await sequelize.query(
      "SELECT * FROM (SELECT t1.chatId AS chatId,chats.group as `group` FROM (SELECT chatId FROM `chat_users` where userId = :uId) AS t1 INNER JOIN chats ON t1.chatId = chats.id WHERE chats.group = 1) AS t2 INNER JOIN `groups` as t3 ON t2.chatId = t3.chatId ;",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: { uId },
      }
    );
    res.json(result.concat(groupResult));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
export const getGroup = async (req: ReqUser, res: Response) => {
  try {
    // Find all chats for the given userId
    const cId = parseInt(req.params.id);
    if(isNaN(cId)){
      res.status(400).send("Bad Request");
      return;
    }
    const chatUser = await ChatUsers.findOne({where:{chatId:cId,userId:req.user.id}});
    if(!chatUser){
      res.status(400).send("Bad Request");
      return;
    }
    const members = await sequelize.query("SELECT t1.userId , t1.chatId , users.name FROM (SELECT userId , chatId FROM `chat_users` WHERE chatID = :cId) AS t1 INNER JOIN users ON t1.userId = users.id;",{
      type: QueryTypes.SELECT,
      raw: true,
      replacements: { cId },
    })
    const groupInfo = await Group.findOne({where:{chatId:cId}});

    res.json({groupInfo,members});
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
export const addMember = async (req: ReqUser, res: Response) => {
  try {
    // Find all chats for the given userId
    const cId = parseInt(req.params.id);
    if(isNaN(cId)){
      res.status(400).send("Bad Request");
      return;
    }
    const group:any = await Group.findOne({where:{chatId:cId}});
    if(!group || group.admin != req.user.id){
      res.status(400).send("Bad Request");
      return;
    }
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

    const chatUser = await ChatUsers.findOne({where:{chatId:group.chatId,userId:person.id}});
    if(chatUser){
      res.status(400).json({Message:"Already Present"});
      return;
    }
    const newMember = await ChatUsers.create({chatId:group.chatId,userId:person.id});

    res.json({chatId:cId,userId:person.id,name:person.name});
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
export const removeMember = async (req: ReqUser, res: Response) => {
  try {
    // Find all chats for the given userId
    const cId = parseInt(req.params.id);
    if(isNaN(cId)){
      res.status(400).send("Bad Request");
      return;
    }
    const group:any = await Group.findOne({where:{chatId:cId}});
    if(!group || group.admin != req.user.id){
      res.status(400).send("Bad Request");
      return;
    }
    const { userId } = req.body;
    const uId = parseInt(userId);
    if(isNaN(uId)){
      res.status(400).send("Bad Request");
      return;
      }
    if(!userId){
      res.status(400).send("Bad Request");
      return;
      }
    if(group.admin == userId){
      res.status(400).send("Bad Request");
      return;
    }
    const rUser = await ChatUsers.findOne({where:{chatId:group.chatId,userId:uId}});
    if(!rUser){
      res.status(400).send("Bad Request");
      return;
    }else{
      await rUser.destroy()
    }
    res.json({Message:"removed successfully"});
  } catch (err) {
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
    res.status(500).json({ error });
  }
};
