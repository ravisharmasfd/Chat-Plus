import { Route, Routes } from "react-router-dom"
import SignUp from "./Pages/SignUp"

function App() {

  return (
   <div className="bg-black text-white">
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
   </div>
  )
}

export default App
