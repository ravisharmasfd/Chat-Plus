import React, { useEffect, useState } from 'react'
import { ChatType } from '../Types';
import Chat from '../Components/Chat';

import { Transition } from '@headlessui/react';
import Messages from '../Components/Messages';
function Home() {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);
  const [selectedChat, setSelectedChat] = useState<ChatType|null>(null);

  useEffect(() => {
    function handleResize() {
      setIsWideScreen(window.innerWidth > 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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