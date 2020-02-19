import React, { useState } from "react";
import axios from "axios";

import CardModal from "../../../components/CardModal";
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";

const FAILING_VALIDATION_CODE = 422;

function NewEmployeeModal({ show, onHide, onNewEmployeeAdded }) {
    const [isSendingData, setSendingData] = useState(false);
    const [validationErrors, setValidationErrors] = useState();

    const onFormSubmit = formData => {
        setSendingData(true);
        axios
            .post(ApiRoutes.employees, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(() => {
                setSendingData(false);
                onNewEmployeeAdded();
            })
            .catch(({ response: r }) => {
                if (r.status === FAILING_VALIDATION_CODE) {
                    setValidationErrors(r.data);
                }
                setSendingData(false);
            });
    };

    return (
        <CardModal title="Добавить сотрудника" show={show} onHide={onHide}>
            {!isSendingData ? (
                <EmployeeForm
                    onCancel={onHide}
                    onSubmit={onFormSubmit}
                    validationErrors={validationErrors}
                />
            ) : (
                <Loading />
            )}
        </CardModal>
    );
}
export default NewEmployeeModal;