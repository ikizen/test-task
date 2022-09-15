// import Register from "./Register";
// import eact from "react";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import axios from "axios";
// import SignUp from "./Signup";
// import Info from "../api/usersList";
// import Post from "../api/post";

const URL = "https://reqres.in/api/login";
const URL_PAGE1 = "https://reqres.in/api/users?page=1";
const URL_PAGE2 = "https://reqres.in/api/users?page=2";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export function Login() {
    // const [user, setUser] = useState();
    const result = [];
    const userRef = React.useRef();

    //INPUT USER
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    //INPUT PASSWORD
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    //MATCHING PASSWORD
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    //ERROR AND SUCCESS MESSAGE

    //FOCUS WHEN PAGE LOADED
    useEffect(() => {
        userRef.current.focus();
    }, []);

    //USER VALIDATION
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    //PASSWORD VALIDATION
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    const userList = () => {
        const USERS_LIST = axios
            .all([axios.get(URL_PAGE1), axios.get(URL_PAGE2)])
            .then(
                axios.spread((obj1, obj2) => {
                    // Both requests are now complete
                    const page1 = obj1.data.data;
                    const page2 = obj2.data.data;
                    const page = [...page1, ...page2];
                    // console.log(page);
                    const list = page.map((elem) => {
                        result.push(elem.email);
                        // const result = [...email.email];
                        // console.log(result);
                    });
                    // console.log(obj1.data.data);
                    // console.log(obj2.data.data);
                })
            );
        // console.log(USERS_LIST);
        console.log(result);
    };
    const Post = () => {
        axios
            .post(URL, {
                email: "george.bluth@reqres.in",
                password: "groueaf",
            })
            .then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    const GoToHome = () => {};

    return (
        <div className="login bg-[#111827] min-h-screen h-full flex flex-col justify-center items-center text-white ">
            <div className="card ">
                {/* w-2/5 md:w-3/5 min-h-100 w-min-5/6 */}
                <div className="">
                    <h1 className="flex justify-center pb-3">Test Task</h1>
                </div>
                <div
                    className="login p-6 
                bg-[#1f2937] rounded-lg border border-slate-700"
                >
                    <h1 className="text-center">Log in</h1>
                    <div className="">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            // ref={userRef}
                            // onChange={(e) => setUser(e.target.value)}
                            ref={userRef}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="frodo@baggins.com"
                            required
                        />
                    </div>
                    <div>
                        <div className="">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                onChange={(e) => setPwd(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>
                    <Link to="/home">
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-1 mr-2 mt-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="button"
                            onClick={userList}
                        >
                            Log in
                        </button>
                    </Link>
                    <div className="flex justify-items-end items-end content-end m-0">
                        <Link
                            to="/signup"
                            className="text-end text-[0.6rem] hover:text-blue-400"
                        >
                            Don't have an account?
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <h1 onClick={Post}>hello hello hello hello</h1>
            </div>
        </div>
    );
}
