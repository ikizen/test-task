import react from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const URL_PAGE1 = "https://reqres.in/api/users?page=1";
const URL_PAGE2 = "https://reqres.in/api/users?page=2";

const Home = () => {
    const result = [];

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // userList();
        // page1();
    }, []);

    const page1 = () => {
        // const names = [];
        axios.get(URL_PAGE1).then((response) => {
            const data = response.data.data;
            // console.log(data);
            data.map((elem) => {
                const name = elem.first_name;
                setFirstName(name);
                // console.log(state);
                return <p>{firstName}</p>;
            });
        });
        return (
            <div>listName </div>
            // <p>{firstName}</p>
        );
    };

    // const userList = () => {
    //     // const { name } = props;
    //     axios.all([axios.get(URL_PAGE1), axios.get(URL_PAGE2)]).then(
    //         axios.spread((obj1, obj2) => {
    //             // Both requests are now complete
    //             const page1 = obj1.data.data;
    //             const page2 = obj2.data.data;
    //             const users = [...page1, ...page2];
    //             console.log(users);
    //         })
    //     );
    // };

    return (
        <section>
            <div>
                <h1
                //  onClick={}
                >
                    home page nahu
                </h1>
                {page1()}
            </div>
        </section>
    );
};

export default Home;
