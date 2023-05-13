import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { StateType, UserType } from "./Types";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useEffect, useState } from "react";
import { getUser } from "./Api";
import { signIn } from "./Store/authSlice";
import io, { Socket } from "socket.io-client";
import React from "react";
import Loader from "./Components/Loader";
const Home = lazy(() => import("./Pages/Home"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const socket = io(import.meta.env.VITE_BACKEND_SOCKET_API);
interface SocketContextValue {
  socket: Socket;
}
export const SocketContext = React.createContext<SocketContextValue>({
  socket,
});

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
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    onLoad();
  }, [user]);
  if (loading) {
    return <Loader />;
  }
  return (
    <SocketContext.Provider value={{ socket }}>
      <div className="w-screen h-screen bg-gray-50">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Suspense fallback={<Loader />}>
                  <SignUp />
                </Suspense>
              )
            }
          />
          <Route
            path="/signin"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Suspense fallback={<Loader />}>
                  <SignIn />
                </Suspense>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/signin" />
              ) : (
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              )
            }
          />
        </Routes>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
