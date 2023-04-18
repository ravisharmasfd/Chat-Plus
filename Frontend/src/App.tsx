import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import { StateType, UserType } from "./Types";
import { Discuss } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getUser } from "./Api";
import { signIn } from "./Store/authSlice";
function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector<StateType>((state) => {
    return state?.auth?.user;
  });

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
  onLoad();
  console.log("run")
}, [user]);
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
    <div className="w-screen h-screen bg-gray-50">
      <Routes>
        <Route path="/signup" element={user?<Navigate to="/"/>:<SignUp />} />
        <Route path="/signin" element={user?<Navigate to="/"/>:<SignIn />} />
        <Route path="/" element={!user?<Navigate to="/signin"/>:<Home />} />
      </Routes>
    </div>
  );
}

export default App;
