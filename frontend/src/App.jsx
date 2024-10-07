import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import {  useAuthContext} from "./context/useAuthContext";

export default function App() {
  const {isLoggedIn} = useAuthContext();

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<div>Route isn't allowed</div>} />
        </Routes>
      </BrowserRouter>
      </div>
  );
}
