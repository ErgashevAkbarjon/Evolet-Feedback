import React, { useState } from "react";
import axios from "axios";

import CardModal from "../../../components/CardModal";
import CustomerForm from "../../../components/forms/CustomerForm";
import { ApiRoutes } from "../../../routes";

function CustomerEditModal({ customer, show, onHide, onCustomerUpdated }) {
    const updateCustomer = updatedCustomer => {
        const customerPutUrl = ApiRoutes.customers + "/" + customer.id;

        axios
            .put(customerPutUrl, updatedCustomer)
            .then(({ data }) => {
                onCustomerUpdated(data);
            })
            .catch(e => console.log(e));
    };

    return (
        <CardModal
            show={show}
            onHide={onHide}
            title="Изменить данные пользователя"
        >
            <CustomerForm
                customer={customer}
                onSubmit={updateCustomer}
                onCancel={onHide}
            />
        </CardModal>
    );
}

export default CustomerEditModal;