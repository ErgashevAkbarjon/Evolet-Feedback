require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";

import {AuthContextProvider} from "./components/AuthContext";

function App(props) {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Main} />
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
