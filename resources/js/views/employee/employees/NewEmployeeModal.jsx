import React, { useState } from "react";
import axios from "axios";

import CardModal from "../../../components/CardModal";
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";

export default function NewEmployeeModal({ show, onHide, onNewEmployeeAdded }) {
    const [isSendingData, setSendingData] = useState(false);

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
            .catch(e => {
                setSendingData(false);
            });
    };

    return (
        <CardModal title="Добавить сотрудника" show={show} onHide={onHide}>
            {!isSendingData ? (
                <EmployeeForm onCancel={onHide} onSubmit={onFormSubmit} />
            ) : (
                <Loading />
            )}
        </CardModal>
    );
}
