import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { port } from './config/env';
import sequelize from './database';
import router from './routes/index'
import { ChatUsers, ChatUsersAttributes } from './models/ChatUser';
import { Op } from 'sequelize';
import { Server } from 'socket.io';

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use('/api',router);
(async () => {
    await sequelize.sync();
    const server = app.listen(port,()=>{
        console.log(`Server running at ${port} port`);  
    })
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    interface ActiveUsersType{
      id:number;
      socketId:string;
    }
    let activeUsers: ActiveUsersType[] = [];
  
   io.on("connection", (socket) => {
    socket.on("addNewUser", (newUserId:number) => {
      if (!activeUsers.some((user) => user.id === newUserId)) {
        activeUsers.push({id:newUserId,socketId:socket.id});
        io.emit("getUser", activeUsers.map((u:ActiveUsersType)=>{
          return u.id
        }));
      }
    });
  
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      io.emit("getUser", activeUsers.map((u:ActiveUsersType)=>{
        return u.id
      }));
    });
  
    socket.on("sendMessage", async(data) => {
      try {
        const { chatId,userId } = data;
      const userWithChatId = await ChatUsers.findAll({where:{chatId,userId:{
        [Op.not]:userId
      }}}) as ChatUsersAttributes[];
      userWithChatId.forEach((uc)=> {
        const activeUser = activeUsers.find(user => user.id == uc.userId);
        if (activeUser) {
          const { socketId } = activeUser;
          io.to(socketId).emit('newMessage', data);
        }
      
    });
      } catch (error) {
        
      }
  });
  });
  
  })();

  