import React from "react";
import axios from "axios";

import CardModal from "../../../components/CardModal";
import { ApiRoutes } from "../../../routes";

function CustomerDeleteModal({ show, onHide, customer, onCustomerDeleted }) {
    const deleteCustomer = () => {
        const customerDeleteURL = ApiRoutes.customers + "/" + customer.id;
        axios
            .delete(customerDeleteURL)
            .then(() => onCustomerDeleted())
            .catch(e => console.log(e));
    };

    return customer ? (
        <CardModal show={show} onHide={onHide} title="Удаление пользователя">
            <p className="text-center">
                Вы действительно хотите удалить пользователя
                <br/>
                <b>{customer.user.full_name}</b> ?
            </p>
            <div className="text-center">
                <button
                    className="btn btn-danger mr-3 rounded-pill px-4"
                    onClick={deleteCustomer}
                >
                    Да
                </button>
                <button className="btn btn-success rounded-pill px-4" onClick={onHide}>
                    Нет
                </button>
            </div>
        </CardModal>
    ) : null;
}

export default CustomerDeleteModal;
