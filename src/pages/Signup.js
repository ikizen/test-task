// import HeaderComponent from "../components/header";
// import SignUpComponent from "../components/signUp";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const apiURL =
    "https://emailvalidation.abstractapi.com/v1/?api_key=e22fa91464c54b69b67706e4d04a729e";

const sendEmailValidationRequest = async (email) => {
    try {
        const response = await axios.get(apiURL + "&email=" + email);
        return response.data.is_valid_format.value;
    } catch (error) {
        throw error;
    }
};

const handleValidateEmail = async (email) => {
    const isValid = await sendEmailValidationRequest(email);
    return isValid;
};

const Signup = () => {
    const [email, setEmail] = useState("");
    const errors = {};
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log("submitted in sign up page!");
    // };

    return (
        <div className="login bg-[#111827] min-h-screen h-full flex flex-col justify-center items-center text-white ">
            <div className="">
                <h1 className="flex justify-center pb-3">Sign up</h1>
            </div>
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    const validated = await handleValidateEmail(values.email);
                    if (!validated) {
                        errors.email = "Invalid email";
                    } else {
                        errors.email = "";
                        const requestEmail = values.email;
                        const json = JSON.stringify(requestEmail);
                        console.log("SUBMITTED! ", JSON.stringify(values));
                        navigate("/home");

                        dispatch(authActions.login());
                    }
                }}
            >
                {({ handleSubmit }) => (
                    <Form className="login p-6 bg-[#1f2937] rounded-lg border border-slate-700">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            Email:
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                // ref={userRef}
                                // onChange={(e) => setUser(e.target.value)}
                                // ref={userRef}
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 block w-full p-2.5 "
                                placeholder="frodo@baggins.com"
                                required
                            />
                            {errors.email && (
                                <div style={{ color: "red" }}>
                                    {errors.email}
                                </div>
                            )}
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
                                // onChange={(e) => setPwd(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </label>
                        {/* <Link to="/home"> */}
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-1 mr-2 mt-2 mb-2 focus:outline-none "
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Sign up
                        </button>
                        {/* </Link> */}
                        <div className="flex justify-items-end items-end content-end m-0">
                            <Link
                                to="/"
                                className="text-end text-[0.6rem] hover:text-blue-400"
                            >
                                Log in to your account
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Signup;
