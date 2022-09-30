import react from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AllUsers from "../store/allUsers";
import { Link } from "react-router-dom";
import { User } from "@doist/todoist-api-typescript";

const URL_PAGE = "https://reqres.in/api/users";

const Home = () => {
    const result = [];

    const [email, setEmail] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        // userList();
        // page1();
    }, []);

    const [reqResUsers, setReqResUsers] = useState([]);

    const fetchUsers = async () => {
        await axios.get(`${URL_PAGE}?page=${page}`).then((response) => {
            const user = response.data.data;
            console.log(response.data);
            console.log(User);
            // const products = data;
            setReqResUsers(user);
        });
        // console.log(products);
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    return (
        <section className="bg-[#111827] min-h-screen h-full text-white">
            <nav className="flex flex-row">
                <Link to="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                    </svg>
                </Link>
                <h1 className="flex flex-grow justify-center">Home Page</h1>
                <div>
                    <p>Name of who logged in</p>
                </div>
            </nav>
            <div className="flex flex-col items-center">
                <div className="flex justify-center">listName </div>
                {reqResUsers.map((user) => (
                    <div
                        className="flex flex-col bg-[#1e293b] p-2 m-2 rounded w-32 h-32 hover:bg-gray-700"
                        key={user.id}
                    >
                        <img
                            className="mx-auto w-16 h-16 items-center"
                            src={user.avatar}
                            alt=""
                        />
                        <p className="flex justify-center text-xs py-2">
                            {user.first_name} {user.last_name}
                        </p>
                        <p className="flex justify-center text-[0.5rem] text-[#37bcf7] hover:text-white">
                            {user.email}
                        </p>
                    </div>
                ))}
            </div>
            <ul className="flex justify-center flex-row pb-2">
                <li className="flex p-1 hover:text-sky-400">
                    <button onClick={() => setPage(1)}>1</button>
                </li>
                <li className="flex p-1 hover:text-sky-400 ">
                    <button onClick={() => setPage(2)}>2</button>
                </li>
            </ul>
        </section>
    );
};

export default Home;
