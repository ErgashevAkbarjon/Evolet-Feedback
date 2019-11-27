import React, { useContext } from "react";
import { Redirect } from 'react-router-dom';

import AuthContext from "../components/AuthContext";
import EmployeeMain from '../views/employee/Main';

function Main(props) {
    const { classes, location } = props;
    const authContext = useContext(AuthContext);

    const jwtPayload = parseJwt()

    return authContext.auth ? (
        <EmployeeMain />
    ) : (
        <Redirect
            to={{ pathname: "/login", state: { backUrl: location.pathname } }}
        />
    );
}

export default Main;
