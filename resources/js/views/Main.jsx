import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "../components/AuthContext";
import EmployeeMain from "../views/employee/Main";
import CustomerMain from "../views/customer/Main";

function Main(props) {
    const { location } = props;
    const authContext = useContext(AuthContext);

    if (!authContext.auth) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { backUrl: location.pathname }
                }}
            />
        );
    }

    if (authContext.authIsAdmin() || authContext.authIsEmployee()) {
        return <EmployeeMain />;
    }

    return <CustomerMain />;
}

export default Main;
