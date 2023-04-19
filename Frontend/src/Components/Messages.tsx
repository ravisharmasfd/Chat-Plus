import React, { useContext, useEffect } from "react";
import { ChatType, MessageType, StateType } from "../Types";
import MessagesHeader from "./MessagesHeader";
import AddMessage from "./AddMessage";
import { useState } from "react";
import MessagesShower from "./MessagesShower";
import { addMessageApi, getMessagesApi } from "../Api";
import { TailSpin } from "react-loader-spinner";
import { SocketContext } from "../App";
import { useSelector } from "react-redux";
import GroupDetails from "./GroupDetail";

function Messages() {
  const [modal, setModal] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [soketMsg, setSocketMsg] = useState<MessageType|null>(null)
  const [loadingGetMessages, setLoadingGetMessages] = useState<boolean>(false);
  const { socket } = useContext(SocketContext);
  const selectedChat = useSelector<StateType>(
    (state) => state.selectChat.chat
  ) as ChatType;
  async function addMessage(text: string, name: string, userId?: number) {
    try {
      if (selectedChat) {
        const message = await addMessageApi(text, selectedChat.chatId);
        const now = new Date();
        socket.emit("sendMessage", {
          chatId: selectedChat.chatId,
          userId,
          text,
          name,
          createdAt: now.toISOString(),
        });
        setMessages([
          ...messages,
          {
            text,
            userId,
            name,
            chatId: selectedChat.chatId,
            createdAt: now.toISOString(),
          },
        ]);
      }
    } catch (error) {}
  }
  async function getMessages() {
    try {
      setLoadingGetMessages(true);
      const m = await getMessagesApi(selectedChat?.chatId);
      setMessages(m);
    } catch (error) {
    } finally {
      setLoadingGetMessages(false);
    }
  }
  useEffect(() => {
    if (selectedChat) {
      getMessages();
    }
  }, [selectedChat]);
  useEffect(()=>{
    socket.on("newMessage", (data) => {
      setSocketMsg(data);
    });
  },[])
  useEffect(()=>{
    if(soketMsg){
      setMessages([...messages,soketMsg]);
    }
  },[soketMsg])
  if (modal) {
    return <GroupDetails setModal={setModal}></GroupDetails>;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-between relative px-4 py-8">
      <MessagesHeader setModal={setModal} />
      {loadingGetMessages ? (
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
      ) : (
        <MessagesShower messages={messages} />
      )}
      <AddMessage addMessage={addMessage} />
    </div>
  );
}

export default Messages;
