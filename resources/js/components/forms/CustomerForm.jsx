import React, { useState, useEffect } from "react";
import axios from "axios";

import { ApiRoutes } from "../../routes";
import Loading from "../Loading";

function CustomerForm({
    customer,
    onSubmit,
    onCancel,
    validationErrors: validationErrorsProp
}) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [pc, setPC] = useState();

    const [pcItems, setPCItems] = useState();

    const [validationErrors, setValidationErrors] = useState();

    let mounted;

    const fetchPC = () => {
        axios
            .get(ApiRoutes.pc)
            .then(({ data }) => {
                if (!mounted) return;

                setPCItems(data);

                if (!customer) setPC(data[0].id);
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        mounted = true;

        fetchPC();

        if (!customer) return;

        setFullName(customer.user.full_name);
        setEmail(customer.user.email);
        setPC(customer.pc_id);

        return () => (mounted = false);
    }, []);

    useEffect(() => {
        setValidationErrors(validationErrorsProp);
    }, [validationErrorsProp]);

    const formSubmitted = e => {
        e.preventDefault();

        onSubmit({
            full_name: fullName,
            email,
            pc
        });
    };

    const inputChanged = ({ target }) => {
        const { name, value } = target;

        if (validationErrors && validationErrors.hasOwnProperty(name)) {
            let resetedInputErrors = validationErrors;
            resetedInputErrors[name] = null;

            setValidationErrors(resetedInputErrors);
        }

        switch (name) {
            case "full_name":
                setFullName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "pc":
                setPC(value);
                break;
        }
    };

    const emailErrors = validationErrors ? validationErrors.email : null;

    return pcItems ? (
        <form onSubmit={formSubmitted}>
            <div className="form-group">
                <label htmlFor="full_name">Полное имя</label>
                <input
                    type="string"
                    className="form-control"
                    id="full_name"
                    name="full_name"
                    value={fullName}
                    onChange={inputChanged}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className={
                        emailErrors ? "form-control is-invalid" : "form-control"
                    }
                    id="email"
                    name="email"
                    value={email}
                    onChange={inputChanged}
                    required
                />
                {emailErrors
                    ? emailErrors.map(error => (
                          <div className="invalid-feedback">{error}</div>
                      ))
                    : null}
            </div>
            <div className="form-group">
                <label htmlFor="pc">ПК</label>
                <select
                    className="form-control"
                    id="pc"
                    name="pc"
                    value={pc}
                    onChange={inputChanged}
                    required
                >
                    {pcItems.map((pcItem, i) => (
                        <option key={i} value={pcItem.id}>
                            {pcItem.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="text-right">
                <button
                    type="submit"
                    className="btn btn-success rounded-pill mr-3"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    className="btn btn-primary rounded-pill"
                    onClick={onCancel}
                >
                    Отмена
                </button>
            </div>
        </form>
    ) : (
        <Loading />
    );
}

export default CustomerForm;
