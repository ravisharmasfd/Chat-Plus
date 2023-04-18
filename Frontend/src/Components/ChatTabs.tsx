import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signOut } from "../Store/authSlice";
interface Props {
  setSelectedTab:  React.Dispatch<React.SetStateAction<string>>;
  selectedTab:string;
}
function ChatTabs({setSelectedTab,selectedTab}:Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const logoutFunc = () => {
    Cookies.remove("token");
    dispatch(signOut())
    navigate("/signin");
  }
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex -mb-px">
        <li className="mr-1">
          <button
          onClick={()=>{
            setSelectedTab("chat")
          }}
            className={selectedTab=="chat"?"inline-block p-4 text-purple-600 border-b-2 border-purple-600 rounded-t-lg active dark:text-purple-500 dark:border-purple-500":"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
          >
            Chats
          </button>
        </li>
        <li className="mr-1">
          <button
          onClick={()=>{
            setSelectedTab("group")
          }}
            className={selectedTab=="group"?"inline-block p-4 text-purple-600 border-b-2 border-purple-600 rounded-t-lg active dark:text-purple-500 dark:border-purple-500":"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
            aria-current="page"
            style={{ color: "#8B5CF6" }}
          >
            Groups
          </button>
        </li>
        <li className="mr-1">
          <button
            className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            onClick={logoutFunc}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ChatTabs;
