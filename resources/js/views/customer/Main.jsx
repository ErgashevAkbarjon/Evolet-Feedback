import React from "react";
import { Switch, Route } from "react-router-dom";

import { CustomerRoutes } from '../../routes';

function Main() {
    return (
        <div className="container-fluid h-100">
            <div className="row d-flex justify-content-center align-content-center h-100">
                <Switch>
                    {
                        CustomerRoutes.map((routeProps, i) => (
                            <Route key={i} {...routeProps}/>
                        ))
                    }
                </Switch>
            </div>
        </div>
    );
}

export default Main;
