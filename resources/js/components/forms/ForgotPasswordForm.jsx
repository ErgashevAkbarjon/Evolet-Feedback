import React, { useState } from "react";

function ForgotPasswordForm({ onSendEmailClick }) {
    const [email, setEmail] = useState("");

    const onFormSubmit = e => {
        e.preventDefault();

        onSendEmailClick(email);
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
            <button type="submit" className="btn btn-primary btn-block">
                Отправить письмо
            </button>
        </form>
    );
}
export default ForgotPasswordForm;
