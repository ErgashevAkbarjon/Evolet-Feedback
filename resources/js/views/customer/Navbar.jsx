import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ApiRoutes } from "../../routes";
import axios from "axios";
import AuthContext from "../../components/AuthContext";
import Loading from "../../components/Loading";

const navbarLinks = [
    { name: "Новый фидбек", url: "/" },
    { name: "История", url: "/customer/feedbacks" }
];

function Navbar() {
    const currentUrl = window.location.pathname;

    const [customer, setCustomer] = useState();

    const authContext = useContext(AuthContext);

    const fetchCustomerData = () => {
        const user = parseJwt(authContext.auth).sub[0];

        axios
            .get(`${ApiRoutes.customers}?user_id=${user.id}&fields=bonus`)
            .then(({ data }) => {
                setCustomer(data[0]);
            })
            .catch(e => console.log(e));
    };

    const onSignOut = () => {
        authContext.resetAuth();
    }

    useEffect(() => {
        fetchCustomerData();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Feedback
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-auto">
                    {navbarLinks.map((link, i) => (
                        <li
                            key={i}
                            className={
                                "nav-item " +
                                (currentUrl === link.url ? " active" : "")
                            }
                        >
                            <Link className="nav-link" to={link.url}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {customer ? <div>Баллы: {customer.bonus}</div> : <Loading />}
                <button className="btn btn-link" onClick={onSignOut}>Выйти</button>
            </div>
        </nav>
    );
}

export default Navbar;
