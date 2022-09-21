import "./App.css";
import React from "react";
import { useState } from "react";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    const adminUser = {
        email: "admin@admin.com",
        password: "admin888",
    };

    const [user, setUser] = useState({ name: "", email: "" });
    const [err, setErr] = useState("");

    const oogin = (details) => {
        console.log(details);
    };

    const Logout = () => {
        console.log("Logout");
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
