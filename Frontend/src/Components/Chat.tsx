import React, { useEffect, useState } from "react";
import ChatTabs from "./ChatTabs";
import ChatButton from "./ChatButton";
import { Dialog } from "@headlessui/react";
import AddChat from "./AddChat";
import { ChatType, StateType } from "../Types";
import { getChats } from "../Api";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { redirect, useNavigate } from "react-router";
interface Props{
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatType | null>>
}
function Chat({setSelectedChat}:Props) {
  const [modal, setModal] = useState<boolean>(false);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector<StateType>((state)=>state.auth.user)
  const navigate = useNavigate()
  async function fetchChats() {
    try {
      setLoading(true);
      const token = Cookies.get('token')
      console.log(token);
      const chats = await getChats();
      if(chats) setChats(chats);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/");
      
      

    }
  }
  useEffect(() => {
    if(user){
      fetchChats();
    }else{
      navigate("/")
    }
  }, [user]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative px-4 py-8">
      <ChatTabs />
      <AddChat modal={modal} setModal={setModal} />
      <div className=" w-full h-full py-4 my-4 overflow-y-auto bg-purple-100 rounded-2xl text-black flex flex-col items-center justify-start">
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
        ) : (
          chats.map((chat) => {
            return (
              <button onClick={()=>{setSelectedChat(chat)}}
                className="w-[80%] h-[10%] bg-purple-500 flex items-center  rounded-xl hover:bg-purple-600 py-2 pl-2 pr-6 m-1 border-solid border-purple-600 hover:text-white border-b-2 gap justify-between duration-500 hover:pr-2"
                key={chat.chatId}
              >
                {chat.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            );
          })
        )}
      </div>

      <ChatButton setModal={setModal} />
    </div>
  );
}

export default Chat;
