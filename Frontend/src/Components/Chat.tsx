import React, { useContext, useEffect, useState } from "react";
import ChatTabs from "./ChatTabs";
import ChatButton from "./ChatButton";
import AddChat from "./Modal";
import {  ChatType, StateType } from "../Types";
import { getChats } from "../Api";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SocketContext } from "../App";
import ChatList from "./ChatList";
import Modal from "./Modal";
import AddCHatChildren from "./AddChatChildren";

function Chat() {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("chat");
  const [chats, setChats] = useState<ChatType[]>([]);
  const [groupChats, setGroupChats] = useState<ChatType[]>([]);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [activeUser,SetActiveUser] = useState<number[]>([]);
  const user = useSelector<StateType>((state) => state.auth.user);
  const navigate = useNavigate();
  const {socket} = useContext(SocketContext);
  async function fetchChats() {
    try {
      setLoading(true);
      const chats = await getChats() as ChatType[];
      let personChat:ChatType[] =[];
      let groupChat:ChatType[] =[];
      if (chats){
        chats.forEach(chat=>{
          if (chat.group) {
            groupChat.push(chat);
            } else {
                personChat.push(chat)
              }
        })
      }
      setChats(personChat);
      setGroupChats(groupChat);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/");
    }
  }
  useEffect(() => {
    if (user) {
      fetchChats();
    } else {
      navigate("/");
    }
  }, [user]);
  useEffect(() => {
    socket.on("getUser",(data)=>{
      SetActiveUser(data)
    })
  },[])

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative px-4 py-8">
      <ChatTabs setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <Modal modal={modal} setModal={setModal}><AddCHatChildren setModal={setModal}/></Modal>
      {loading ? (
          <TailSpin
            height="80"
            width="80"
            color="#a855f7"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ):<ChatList chats={(selectedTab=="chat"?chats:groupChats)} activeUser={activeUser} />}
      <ChatButton setModal={setModal} />
    </div>
  );
}

export default Chat;
