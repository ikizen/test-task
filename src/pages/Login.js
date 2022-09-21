// import Register from "./Register";
// import eact from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import axios from "axios";
import { redirect } from "react-router-dom";
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
    const errRef = React.useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [validEmail, setValidEmail] = useState(0);
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

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
                email: user,
                password: pwd,
            })
            .then(
                (response) => {
                    console.log(response.status);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    const Login = (details) => {
        console.log(details);
    };

    const Logout = () => {
        console.log("Logout");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let status;
        // console.log(user, pwd);
        const request = axios
            .post(URL, {
                email: user,
                password: pwd,
            })
            .then(
                (response) => {
                    status = response.status;
                    const configData = response.config.data;
                    if (status === 200) {
                        navigate("/home");
                    }
                    // console.log(validEmail);

                    console.log(status);
                    // console.log(configData);
                },
                (error) => {
                    console.log(error);
                }
            );

        await request;
        setValidEmail(status);

        if (validEmail === 200) {
            setLogin(true);
        }
        console.log(validEmail);
        // console.log(login);
        console.log(`You loged in with this email: "${user}"`);
    };

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
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
                            onChange={(e) => setUser(e.target.value)}
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
                            // required
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </label>
                    {/* <Link to="/"> */}
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-1 mr-2 mt-2 mb-2"
                        // type="button"
                        // onClick={Post}
                        // onSubmit={handleSubmit}
                        // onSubmit={() => console.log("submitted nahui")}
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
