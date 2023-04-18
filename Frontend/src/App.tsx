import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import { StateType, UserType } from "./Types";
import { Discuss } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { createContext, useEffect, useState } from "react";
import { getUser } from "./Api";
import { signIn } from "./Store/authSlice";
import io, { Socket } from 'socket.io-client';
import React from "react";
const socket = io(import.meta.env.VITE_BACKEND_SOCKET_API);
interface SocketContextValue {
  socket: Socket;
}
export const SocketContext = React.createContext<SocketContextValue>({socket});

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  
  const user = useSelector<StateType>((state) => {
    return state?.auth?.user;
  }) as UserType;

async function onLoad() {
  try {
    setLoading(true);
    const token = Cookies.get("token");
    if (token && !user) {
      const data: UserType = await getUser();
      dispatch(signIn(data));
    }
  } catch (error) {
    Cookies.remove("token")
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  onLoad()
}, [user]);
useEffect(()=>{
  if(user && user.id){
    socket.emit('addNewUser',user.id)
  }
  socket.on("getUser",(data)=>{
    console.log('try getUser')
    console.log(data)
  })
  socket.on("connect",()=>{console.log("connected successfully")})
  return ()=>{
    socket.disconnect();
  }
},[user])
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
    <SocketContext.Provider value={{socket}}>    
      <div className="w-screen h-screen bg-gray-50">
      <Routes>
        <Route path="/signup" element={user?<Navigate to="/"/>:<SignUp />} />
        <Route path="/signin" element={user?<Navigate to="/"/>:<SignIn />} />
        <Route path="/" element={!user?<Navigate to="/signin"/>:<Home />} />
      </Routes>
      </div>
      </SocketContext.Provider>
  );
}

export default App;
