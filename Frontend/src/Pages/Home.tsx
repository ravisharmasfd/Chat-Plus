import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ChatType, StateType, UserType } from '../Types';
import Chat from '../Components/Chat';
import { Discuss } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { signIn } from '../Store/authSlice';
import { getUser } from '../Api';
import { Transition } from '@headlessui/react';
import Messages from '../Components/Messages';
function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);
  const [selectedChat, setSelectedChat] = useState<ChatType|null>(null);
  const user = useSelector<StateType>((state) => {
    return state.auth.user;
  });

async function onLoad() {
  try {
    setLoading(true);
    const token = Cookies.get("token");
    if (token && !user) {
      const data: UserType = await getUser();
      dispatch(signIn(data));
    } else if (!token) {
      navigate("/signin");
    }
  } catch (error) {
    Cookies.remove("token")
    navigate("/signin");
  } finally {
    setLoading(false);
  }
}
useEffect(() => {
  onLoad();
}, []);
  useEffect(() => {
    function handleResize() {
      setIsWideScreen(window.innerWidth > 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  if (loading) {
    return (
      <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
        <Discuss
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          colors={['#a855f7', '#a855f7']}
        />
      </div>
    );}
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