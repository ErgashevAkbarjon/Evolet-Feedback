import React, { useState } from "react";

function LoginForm({ onSignInClick, onForgotPasswordClick }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onFormSubmit = e => {
        e.preventDefault();

        onSignInClick({ email, password });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    className="form-control py-4"
                    placeholder="Введите E-mail"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    className="form-control py-4"
                    placeholder="Введите пароль"
                    required
                />
            </div>
            <div>
                <button type="submit" className="btn btn-primary btn-block">
                    Войти
                </button>
            </div>
            <div className="mt-3">
                <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={onForgotPasswordClick}
                >
                    Забыли пароль?
                </button>
            </div>
        </form>
    );
}
export default LoginForm;
