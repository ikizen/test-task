import React, { useState, useEffect } from "react";
import axios from "axios";
const URL_PAGE1 = "https://reqres.in/api/users?page=1";

const AllUsers = () => {
    const [firstName, setFirstName] = useState("");
    // const names = [];

    axios.get(URL_PAGE1).then((response) => {
        const data = response.data.data;
        // console.log(data);
        data.map((elem) => {
            const name = elem.first_name;
            setFirstName(name);
            // console.log(state);
            // return <p>{firstName}</p>;
        });
    });

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/todos/"
        );
        const products = data;
        setProducts(products);
        console.log(products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <div>Hello</div>
            {products.map((product) => (
                <p key={product.id}>{product.title}</p>
            ))}
        </>
    );
};

export default AllUsers;
