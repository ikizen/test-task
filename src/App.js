import "./App.css";
import React from "react";
import { useState } from "react";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    console.log(`isLoggedIn is now have state: ${isLoggedIn}`);

    return (
        <BrowserRouter>
            <Routes>
                {/* {!isLoggedIn && <Route path="/" element={<Login />} />} */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {isLoggedIn && <Route path="/home" element={<Home />} />}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
