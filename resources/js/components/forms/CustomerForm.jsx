import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import axios from "axios";

import { ApiRoutes } from "../../routes";
import Loading from "../Loading";

const styles = {
    actionButton: {
        borderRadius: "50px",
        padding: ".5em",
        color: "white",
        display: "block",
        width: "100%",
        cursor: "pointer",
        "&:hover": {
            color: "white"
        }
    },
    acceptActionButton: {
        background: "#30D92A",
        borderColor: "#30D92A",
        "&:focus": {
            boxShadow: "0 0 0 0.2rem #30da2a4a"
        }
    }
};

function CustomerForm({ classes, customer, onSubmit, onCancel }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [pc, setPC] = useState();

    const [pcItems, setPCItems] = useState();

    const fetchPC = () => {
        axios
            .get(ApiRoutes.pc)
            .then(({ data }) => {
                setPCItems(data);

                if(!customer)
                    setPC(data[0].id);
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetchPC();

        if(!customer) return;

        setFullName(customer.user.full_name);
        setEmail(customer.user.email);
        setPC(customer.pc_id);

    }, []);

    const formSubmitted = (e) => {
        e.preventDefault();

        onSubmit({
            'full_name': fullName,
            email,
            pc
        });
    };

    const inputChanged = ({ target }) => {
        switch (target.name) {
            case "full_name":
                setFullName(target.value);
                break;
            case "email":
                setEmail(target.value);
                break;
            case "pc":
                setPC(target.value);
                break;
        }
    };

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
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={inputChanged}
                    required
                />
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
            <div className="row justify-content-end">
                <div className="col-7">
                    <div className="row">
                        <div className="col-6 mb-2 mb-xl-0">
                            <button
                                className={
                                    "btn btn-primary " + classes.actionButton
                                }
                                onClick={onCancel}
                            >
                                Отмена
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                className={`btn ${classes.actionButton} ${classes.acceptActionButton}`}
                                type="submit"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    ) : (
        <Loading />
    );
}

export default withStyles(styles)(CustomerForm);
