import React, { useState, useEffect } from "react";
import axios from "axios";

import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";
import CardModal from "../../../components/CardModal";
import CustomerForm from "../../../components/forms/CustomerForm";

function NewCustomer({ show, onHide }) {
    const [isSendingData, setSendingData] = useState(false);

    const formSubmitted = newCustomer => {
        setSendingData(true);

        axios
            .post(ApiRoutes.customers, newCustomer)
            .then(r => setSendingData(false))
            .catch(e => console.log(e));
    };

    return (
        <CardModal show={show} onHide={onHide} title="Новый пользователь">
            {!isSendingData ? (
                <CustomerForm onSubmit={formSubmitted} onCancel={onHide} />
            ) : (
                <Loading />
            )}
        </CardModal>
    );
}

export default NewCustomer;
