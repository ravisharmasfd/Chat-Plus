import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components/Navbar'
import Chat from '../Components/chat';
function Home() {
  
const [messages,setMessages] = useState<string[]>([])
const [message,setMessage] = useState<string>("")
const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);

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
    <div className=' min-h-full min-w-full flex flex-row relative'>
      <div className='w-full h-full absolute md:w-1/3 giveStatic '><Chat/></div>
      <div className='bg-blue-500 z-10 w-full h-full absolute md:w-2/3 md:block giveStatic'>chat</div>
    </div>
   
  )
}

export default Home