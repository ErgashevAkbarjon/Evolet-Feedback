import React, { useState, useContext, useEffect } from "react";
import withStyle from "react-jss";
import { Redirect } from "react-router-dom";
import axios from "axios";

import AuthContext from "../components/AuthContext";
import Loading from "../components/Loading";
import LoginForm from "../components/forms/LoginForm";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

const primaryColor = "#B8CF41";

const btnColor = {
    background: primaryColor + " !important",
    borderColor: primaryColor + " !important"
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
        "& .btn-primary": {
            padding: "0.75em 0",
            ...btnColor,
            "&:hover, &:active": btnColor,
            "&:focus, &:active:focus": {
                boxShadow: "0 0 0 0.2rem rgba(184, 207, 65, 0.5) !important"
            }
        },
        "& .btn-link": {
            color: primaryColor
        }
    },
    logo: {
        width: "100%",
        marginBottom: "3em"
    }
};

function Login({ classes, history, location }) {
    const authContext = useContext(AuthContext);

    const [isSendingData, setSendingData] = useState(false);
    const [error, setError] = useState();
    const [form, setForm] = useState();
    const [info, setInfo] = useState();

    const onSignInClick = creadentials => {
        setSendingData(true);
        setError(null);

        const credentialsFilled = creadentials.email && creadentials.password;

        if (!credentialsFilled) return;

        axios
            .post("/login", creadentials)
            .then(res => {
                setSendingData(false);
                authContext.applyBearer(res.data);
                redirectBack();
            })
            .catch(e => {
                setSendingData(false);
                processErrors(e);
            });
    };

    const onForgotPasswordClick = () => {
        setForm(forgotPasswordForm);
    };

    const onEmailSent = () => {
        setSendingData(false);

        setForm(null);

        setInfo(
            <div className="text-center">
                Письмо с дальнейшими инструкциями отправлено в указанную вами
                почту.
            </div>
        );
    };

    const onSendEmailClick = email => {
        setSendingData(true);
        axios
            .post("/password/forgot", { email })
            .then(onEmailSent)
            .catch(e => {
                setSendingData(false);
                processErrors(e);
            });
    };

    const loginForm = (
        <LoginForm
            onSignInClick={onSignInClick}
            onForgotPasswordClick={onForgotPasswordClick}
        />
    );

    const forgotPasswordForm = (
        <ForgotPasswordForm onSendEmailClick={onSendEmailClick} />
    );

    useEffect(() => {
        setForm(loginForm);
    }, []);

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
                <div className="col-9 col-md-6 col-lg-4 text-center">
                    <a href="/">
                        <img
                            src="/images/Evolet.png"
                            alt="Evolet"
                            className={classes.logo}
                        />
                    </a>
                    {!isSendingData ? form : <Loading />}

                    {info ? (
                        <div className="alert alert-success" role="alert">
                            {info}
                        </div>
                    ) : null}

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
