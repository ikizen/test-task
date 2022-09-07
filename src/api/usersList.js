import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const URL_PAGE1 = "https://reqres.in/api/users?page=1";
const URL_PAGE2 = "https://reqres.in/api/users?page=2";

export default function Info() {
    const USERS_LIST = axios
        .all([axios.get(URL_PAGE1), axios.get(URL_PAGE2)])
        .then(
            axios.spread((obj1, obj2) => {
                // Both requests are now complete
                const page1 = obj1.data.data;
                const page2 = obj2.data.data;
                const page = [...page1, ...page2];
                console.log(page);
                // console.log(obj1.data.data);
                // console.log(obj2.data.data);
            })
        );
    console.log(USERS_LIST);
}
