import React, { useContext } from "react";
import { Redirect } from 'react-router-dom';

import AuthContext from "../components/AuthContext";
import EmployeeMain from '../views/employee/Main';
import CustomerMain from '../views/customer/Main';

function Main(props) {
    const { location } = props;
    const authContext = useContext(AuthContext);

    if(!authContext.auth){
        return (
            <Redirect
                to={{ pathname: "/login", state: { backUrl: location.pathname } }}
            />
        );
    }

    const jwtPayload = parseJwt(authContext.auth);

    const user = jwtPayload.sub[0];

    if(user.hasOwnProperty('type') && user.type === 1){
        return (<EmployeeMain />);
    }
    
    return (<CustomerMain />);
}

export default Main;
