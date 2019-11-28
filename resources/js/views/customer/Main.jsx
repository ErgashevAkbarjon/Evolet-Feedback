import React from "react";
import { Switch, Route } from "react-router-dom";

import { CustomerRoutes } from "../../routes";
import Navbar from "../customer/Navbar";

function Main() {
    return (
        <div className='h-100'>
            <Navbar />
            <div className="container-fluid h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <Switch>
                        {CustomerRoutes.map((routeProps, i) => (
                            <Route key={i} {...routeProps} />
                        ))}
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Main;
