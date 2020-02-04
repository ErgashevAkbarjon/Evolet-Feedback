require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";

import { AuthContextProvider } from "./components/AuthContext";
import ErrorHandler from "./components/ErrorHandler";

function App(props) {
    return (
        <ErrorHandler>
            <BrowserRouter>
                <AuthContextProvider>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" component={Main} />
                    </Switch>
                </AuthContextProvider>
            </BrowserRouter>
        </ErrorHandler>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
