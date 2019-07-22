import React from "react";
import withStyle from "react-jss";

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
        marginBottom: "3em"
    }
};

function Login({ classes }) {
    return (
        <div className={classes.container + " container"}>
            <div className="row justify-center align-items-center">
                <div className="col text-center">
                    <img
                        src="/images/Evolet.png"
                        alt="Evolet"
                        className={classes.logo}
                    />

                    <div className="row justify-content-center">
                        <div className="col-4 text-center">
                            <form action="">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control py-4"
                                        placeholder="Введите E-mail"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
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
            </div>
        </div>
    );
}
export default withStyle(style)(Login);
