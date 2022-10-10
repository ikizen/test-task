import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
// import { redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { hasToken } from "../store/hasToken";
// import { user } from "../store/usersState";

const URL = "https://reqres.in/api/login";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export function Login() {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        let status;
        const request = axios
            .post(URL, {
                email: user,
                password: pwd,
            })
            .then(
                (response) => {
                    status = response.status;
                    // setToken(JSON.stringify(response.data.token));
                    const tokenResponse = JSON.stringify(response.data.token);
                    const configData = response.config.data;

                    if (status === 200) {
                        localStorage.setItem("token", tokenResponse);
                        dispatch(authActions.login(tokenResponse));
                        navigate("/home");
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        await request;
        console.log(`You loged in with this email: "${user}"`);
    };

    return (
        <div className="login bg-[#111827] min-h-screen h-full flex flex-col justify-center items-center text-white">
            <div className="">
                <h1 className="flex justify-center pb-3">Log in</h1>
            </div>
            <div className="login p-6 bg-[#1f2937] rounded-lg border border-slate-700">
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Email:
                        <input
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 block w-full p-2.5"
                            type="email"
                            id="email"
                            placeholder="frodo@baggins.com"
                            // required
                            autoComplete="off"
                            onChange={(e) => {
                                setUser(e.target.value);
                            }}
                        />
                    </label>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Password:
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Enter password"
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </label>
                    {/* <Link to="/"> */}
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-1 mr-2 mt-2 mb-2"
                    >
                        Log in
                    </button>
                    {/* </Link> */}
                </form>
                <p className="flex justify-items-end items-end content-end m-0">
                    <Link
                        to="/signup"
                        className="text-end text-[0.6rem] hover:text-blue-400"
                    >
                        Don't have an account?
                    </Link>
                </p>
            </div>
        </div>
    );
}
