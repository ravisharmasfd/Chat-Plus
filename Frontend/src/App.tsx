import { Route, Routes, useNavigate } from "react-router-dom"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { getUser } from "./Api"
import { StateType, UserType } from "./Types"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "./Store/authSlice"
import { Navbar } from "./Components/Navbar"
import Home from "./Pages/Home"

function App() {
  const [loading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector<StateType>((state)=>{
    return state.auth.user
  })
  async function onLoad(){
    try {
      setLoading(true)
      const token = Cookies.get('token')
      if(token && !user){
        const data:UserType = await getUser();
        dispatch(signIn(data))
      }else if(!token){
        navigate("/signin")
      }
      }catch (error) {
      navigate("/signin")
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    onLoad()
  },[])
  return (
   <div className="w-screen h-screen overflow-hidden bg-gray-50">
    <Navbar />
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
  </div>
  )
}

export default App
