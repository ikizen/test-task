import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const URL = "https://reqres.in/api/login";
const EMAIL = "";
const PASSWORD = "";

export default function Post() {
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
}
