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
import Loading from "../components/Loading";

function Login(props) {
    const { classes, history, location } = props;

    const authContext = useContext(AuthContext);

    const [creadentials, setCreadentials] = useState({
        email: "",
        password: ""
    });

    const [isSendingData, setSendingData] = useState(false);
    const [error, setError] = useState();

    const sendCredentials = e => {
        e.preventDefault();
        setSendingData(true);
        setError(null);

        const credentialsFilled = creadentials.email && creadentials.password;

        if (!credentialsFilled) return;

        axios
            .post("/login", creadentials)
            .then(res => {
                setSendingData(false);
                applyBearer(res.data);
            })
            .catch(e => {
                setSendingData(false);
                processErrors(e);
            });
    };

    const applyBearer = bearer => {
        if (!bearer || bearer === "null") return;

        localStorage.setItem("noitazb", bearer);

        window.axios.defaults.headers.common["Authorization"] =
            "Bearer " + bearer;

        authContext.setAuth(bearer);

        redirectBack();
    };

    const processErrors = e => {
        if (
            e.hasOwnProperty("response") &&
            e.response.hasOwnProperty("data") &&
            e.response.data.hasOwnProperty("error")
        ) {
            setError(e.response.data.error);
        }
    };

    const redirectBack = () => {
        const backPath = location.state.backUrl;

        if (!backPath) history.push("/");

        history.push(backPath);
    };

    return !authContext.auth ? (
        <div className={classes.container + " container"}>
            <div className="row justify-content-center align-items-center">
                <div className="col-7 col-md-6 col-lg-4 text-center">
                    <img
                        src="/images/Evolet.png"
                        alt="Evolet"
                        className={classes.logo}
                    />
                    {!isSendingData ? (
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
                    ) : (
                        <Loading />
                    )}
                    {error ? (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    ) : (
        <Redirect to="/" />
    );
}
export default withStyle(style)(Login);
