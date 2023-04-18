import React from 'react'
import { ChatType, StateType } from '../Types';
import { useDispatch, useSelector } from 'react-redux';
import { setChat } from '../Store/chatSlice';
interface Props {
    chats:ChatType[];
    activeUser:number[];
  }
function ChatList({chats,activeUser}:Props) {
  const dispatch = useDispatch();
  const selectedChat = useSelector<StateType>(state=>state.selectChat.chat) as ChatType;

  return (
    <div className=" w-full h-full py-4 my-4 overflow-y-auto bg-purple-100 rounded-2xl text-black flex flex-col items-center justify-start">
        {chats.map((chat:ChatType) => {
            const online = !chat.group && activeUser.includes(chat.userId);
            return (
              <button
                onClick={() => {
                  dispatch(setChat(chat))
                }}
                className={`w-[80%] h-[10%] ${selectedChat &&( selectedChat?.chatId == chat.chatId) ? "bg-purple-800 text-white pr-2":"bg-purple-500 pr-6"} flex items-center  rounded-xl hover:bg-purple-800 py-2 pl-2 m-1 border-solid border-purple-800 hover:text-white border-b-2 gap justify-between duration-500 hover:pr-2`}
                key={chat.chatId}
              >
                {chat.name}
                {online && <span className="text-green-400 text-sm">Online</span>}
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
          })}
      </div>
  )
}

export default ChatList