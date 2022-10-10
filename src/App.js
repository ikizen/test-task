import "./App.css";
import React from "react";
import { useEffect } from "react";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";

function App({ component: Component, ...rest }) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => !!state.auth.token);
    console.log(`isLoggedIn is now have state: ${isLoggedIn}`);

    useEffect(() => {
        const result = localStorage.getItem("token");
        dispatch(authActions.login(result));
    }, []);

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
