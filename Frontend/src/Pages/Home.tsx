import React, { useContext, useEffect, useState } from 'react'
import { ChatType, StateType, UserType } from '../Types';
import Chat from '../Components/Chat';
import { Transition } from '@headlessui/react';
import Messages from '../Components/Messages';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../App';
function Home() {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);
  const [selectedChat, setSelectedChat] = useState<ChatType|null>(null);
  const {socket} = useContext(SocketContext)
  const user = useSelector<StateType>((state) => {
    return state?.auth?.user;
  }) as UserType;
  function handleResize() {
    setIsWideScreen(window.innerWidth > 768);
  }
  useEffect(() => {
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(()=>{
    if(user && user.id){
      socket.emit('addNewUser',user.id);
    }
    socket.on("getUser",(data:any)=>{
      console.log('try getUser')
      console.log(data)
    })
    socket.on("connect",()=>{console.log("connected successfully")})
    return ()=>{
      socket.disconnect();
    }
  },[user])
  
  return (
    <div className=' w-full h-full overflow-hidden flex flex-row relative'>
      <div className='w-full h-full bg-gray-50 absolute md:w-1/4 giveStatic '><Chat setSelectedChat={setSelectedChat}/></div>
      <Transition className=" w-full h-full bg-gray-50 z-20 absolute md:w-3/4 md:block giveStatic"
        show={(selectedChat)?true:false}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      > <Messages selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>
      </Transition>
    </div>
  )
}

export default Home