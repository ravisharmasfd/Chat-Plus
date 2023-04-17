import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import { Navbar } from "./Components/Navbar";
import Home from "./Pages/Home";
function App() {
  return (
    <div className="w-screen h-screen bg-gray-50">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
