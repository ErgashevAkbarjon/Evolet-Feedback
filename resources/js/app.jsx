require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";

function App(props) {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
