import React, { useEffect } from "react";
import { ChatType, MessageType } from "../Types";
import MessagesHeader from "./MessagesHeader";
import AddMessage from "./AddMessage";
import { useState } from "react";
import MessagesShower from "./MessagesShower";
import { addMessageApi, getMessagesApi } from "../Api";
import { TailSpin } from "react-loader-spinner";
interface Props {
  selectedChat: ChatType | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatType | null>>;
}
function Messages({ selectedChat, setSelectedChat }: Props) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loadingGetMessages, setLoadingGetMessages] = useState<boolean>(false);
  async function addMessage(text: string, name: string, userId?: number) {
    try {
      if (selectedChat) {
        const message = await addMessageApi(text, selectedChat.chatId);
        const now = new Date();
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
      const messages = await getMessagesApi(selectedChat?.chatId);
      setMessages(messages);
    } catch (error) {
    } finally {
      setLoadingGetMessages(false);
    }
  }
  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between relative px-4 py-8">
      <MessagesHeader
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
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
