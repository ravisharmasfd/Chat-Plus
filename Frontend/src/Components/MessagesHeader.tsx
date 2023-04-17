import React from "react";
import { ChatType } from "../Types";

interface Props{
  selectedChat: ChatType | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatType | null>>
}

const MessagesHeader: React.FC<Props> = ({ selectedChat, setSelectedChat }) => {
  const isGroupChat = selectedChat?.group;

  return (
    <div className="flex justify-between items-center bg-purple-100 duration-500 w-full h-[10%] rounded-xl p-4">
      <button
        onClick={() => setSelectedChat(null)}
        className="flex items-center justify-between px-2 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-purple-500 border border-transparent rounded-md hover:bg-purple-800  "
      >
        <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M11.293 4.293a1 1 0 00-1.414 0L5 9.586V7a1 1 0 00-2 0v4a1 1 0 001 1h4a1 1 0 000-2H6.414l5.293-5.293a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span>Back</span>
      </button>

      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-medium">{selectedChat?.name}</h2>
      </div>
      {(isGroupChat == 1) && (
          <button className="flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false">
            Add Member
          </button>
        )}
    </div>
  );
};

export default MessagesHeader;
