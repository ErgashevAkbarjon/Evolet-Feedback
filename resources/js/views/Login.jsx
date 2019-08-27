import React, { useState, useContext } from "react";
import withStyle from "react-jss";
import { Redirect } from "react-router-dom";
import axios from "axios";

const btnColor = {
    background: "#B8CF41 !important",
    borderColor: "#B8CF41 !important"
};

const style = {
    container: {
        height: "100%",
        "& .row": {
            height: "100%"
        },
        "& .form-control:focus": {
            borderColor: btnColor.borderColor,
            boxShadow: "0 0 0 0.2rem rgba(184, 207, 65, 0.5) !important"
        },
        "& .btn": {
            padding: "0.75em 0",
            ...btnColor,
            "&:hover, &:active": btnColor,
            "&:focus, &:active:focus": {
                boxShadow: "0 0 0 0.2rem rgba(184, 207, 65, 0.5) !important"
            }
        }
    },
    logo: {
        width: "100%",
        marginBottom: "3em"
    }
};

import AuthContext from "../components/AuthContext";

function Login(props) {
    const { classes, history, location } = props;
    
    const authContext = useContext(AuthContext);

    const [creadentials, setCreadentials] = useState({
        email: "",
        password: ""
    });

    const sendCredentials = e => {
        e.preventDefault();

        const credentialsFilled = creadentials.email && creadentials.password;

        if (!credentialsFilled) return;

        let bearer;

        axios
            .post("/login", creadentials)
            .then(res => {
                bearer = res.data;
                applyBearer(bearer);
            })
            .catch(e => {
                console.log(e.response.data);
            });
        
    };

    const applyBearer = (bearer) => {
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + bearer;

        authContext.setAuth(bearer);
        
        redirectBack();
    }

    const redirectBack = () => {
        const backPath = location.state.backUrl;
        
        if(!backPath) history.push('/');

        history.push(backPath);
    }

    return !authContext.auth ? (
        <div className={classes.container + " container"}>
            <div className="row justify-content-center align-items-center">
                <div className="col-4 text-center">
                    <img
                        src="/images/Evolet.png"
                        alt="Evolet"
                        className={classes.logo}
                    />
                    <form onSubmit={sendCredentials}>
                        <div className="form-group">
                            <input
                                type="email"
                                value={creadentials.email}
                                onChange={({ target }) =>
                                    setCreadentials({
                                        ...creadentials,
                                        email: target.value
                                    })
                                }
                                className="form-control py-4"
                                placeholder="Введите E-mail"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                value={creadentials.password}
                                onChange={({ target }) =>
                                    setCreadentials({
                                        ...creadentials,
                                        password: target.value
                                    })
                                }
                                className="form-control py-4"
                                placeholder="Введите пароль"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <Redirect to="/" />
    );
}
export default withStyle(style)(Login);
