import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { ChatType, StateType, UserType } from "../Types";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { SocketContext } from "../App";
import Loader from "../Components/Loader";
const Chat = lazy(() => import("../Components/Chat"));
const Messages = lazy(() => import("../Components/Messages"));
function Home() {
  const { socket } = useContext(SocketContext);
  const user = useSelector<StateType>((state) => {
    return state?.auth?.user;
  }) as UserType;
  const selectedChat = useSelector<StateType>(
    (state) => state.selectChat.chat
  ) as ChatType;
  useEffect(() => {
    if (user && user.id) {
      socket.emit("addNewUser", user.id);
    }
    return () => {
      socket.disconnect();
    };
  }, [user]);
  return (
    <div className=" w-full h-full overflow-hidden flex flex-row relative">
      <div className="w-full h-full bg-gray-50 absolute md:w-1/3 giveStatic ">
        <Suspense fallback={<Loader />}>
          <Chat />
        </Suspense>
      </div>
      <Transition
        className=" w-full h-full bg-gray-50 z-20 absolute md:w-2/3 md:block giveStatic"
        show={selectedChat ? true : false}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <Suspense fallback={<Loader />}>
          <Messages />
        </Suspense>
      </Transition>
    </div>
  );
}

export default Home;
