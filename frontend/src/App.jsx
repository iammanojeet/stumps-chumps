// import GamePage from "./pages/GamePage";
import GameTest from "./pages/GameTest.jsx";
import History from "./pages/History.jsx";
import HomePage from "./pages/HomePage";
import Records from "./pages/Records.jsx";
import Rules from "./pages/Rules.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePageSneha.jsx";
import Toss from "./pages/Toss.jsx";
import Home_Sayan from "./pages/HomePage_Sayan.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Homek from "./pages/HomePageKoushtav.jsx";
import All from "./pages/all.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/prev" element={<HomePage />} />

        {/* Final Paths */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<All />} />
        <Route path="/toss" element={<Toss />} />
        <Route path="/game" element={<GameTest />} />
        {/* Final Paths */}

        {/* <Route path="/tossk" element={<Tossk/>} /> */}

        <Route path="/k" element={<Homek />} />
        <Route path="/home" element={<Home />} />

        <Route path="/homeSayan" element={<Home_Sayan />} />

        {/* <Route path="/game" element={<GamePage />} /> */}
        <Route path="/history" element={<History />} />
        <Route path="/records" element={<Records />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </BrowserRouter>
  );
}
