import React from "react";
import withStyles from 'react-jss';

import CardModal from "../../../components/CardModal";

const styles = {
    actionsWrapper: {
        '& button': {
            borderRadius: '50px',
            padding: '7px 20px',
        }
    }
};

function CustomerModal({ classes, customer, show, onHide, onCustomerEdit }) {
    return customer ? (
        <CardModal show={show} onHide={onHide} title="Пользователь">
            <div className="show">
                <div style={{ color: "#707070" }}>
                    <p>{"Имя: " + customer.user.full_name}</p>
                    <p>{"Email: " + customer.user.email}</p>
                    <p>{"ПК: " + customer.pc.name}</p>
                    <p>{"Баллы: " + customer.bonus}</p>
                    <p>{"Добавлен: " + customer.created_at}</p>
                </div>
                <div className={classes.actionsWrapper + " text-right"}>
                    <button className="btn btn-primary mr-3" onClick={onHide}>
                        Отмена
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => onCustomerEdit(customer)}
                    >
                        Изменить
                    </button>
                </div>
            </div>
        </CardModal>
    ) : null;
}

export default withStyles(styles)(CustomerModal);
