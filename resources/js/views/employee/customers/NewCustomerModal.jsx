import React, { useState, useEffect } from "react";
import axios from "axios";

import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";
import CardModal from "../../../components/CardModal";
import CustomerForm from "../../../components/forms/CustomerForm";

const FAILING_VALIDATION_CODE = 422;

function NewCustomer({ show, onHide, onCustomerAdded }) {
    const [isSendingData, setSendingData] = useState(false);
    const [validationErrors, setValidationErrors] = useState();

    const formSubmitted = newCustomer => {
        setSendingData(true);

        axios
            .post(ApiRoutes.customers, newCustomer)
            .then(({ data }) => {
                setSendingData(false);
                onCustomerAdded(data);
            })
            .catch(({ response: r }) => {
                if (r.status === FAILING_VALIDATION_CODE) {
                    setValidationErrors(r.data);
                }
                setSendingData(false);
            });
    };

    return (
        <CardModal show={show} onHide={onHide} title="Новый пользователь">
            {!isSendingData ? (
                <CustomerForm
                    onSubmit={formSubmitted}
                    onCancel={onHide}
                    validationErrors={validationErrors}
                />
            ) : (
                <Loading />
            )}
        </CardModal>
    );
}

export default NewCustomer;
