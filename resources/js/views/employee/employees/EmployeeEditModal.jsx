import React, { useState } from "react";
import axios from "axios";

import CardModal from "../../../components/CardModal";
import EmployeeForm from "../../../components/forms/EmployeeForm";
import Loading from "../../../components/Loading";
import { ApiRoutes } from "../../../routes";

function EmployeeEditModal({ employee, show, onHide, onEmployeeUpdated }) {
    const [isSendingData, setSendingData] = useState(false);

    const formSubmitted = formData => {
        setSendingData(true);
        const employeeUpdateUrl = ApiRoutes.employees + "/" + employee.id;

        //Bacause of restricion of php that can recognize multipart/form-data 
        //only with POST method we will send it with POST method but with trick of "_method" input
        //so Lumen wil recognize it as PUT
        formData.append("_method", "put");

        axios
            .post(employeeUpdateUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(({data}) => {
                onEmployeeUpdated(data);
            })
            .catch(e => {
                console.log(e);
                setSendingData(false);
            });
    };

    return (
        <CardModal
            title="Изменить данные сотрудника"
            show={show}
            onHide={onHide}
        >
            {!isSendingData ? (
                <EmployeeForm
                    employee={employee}
                    onSubmit={formSubmitted}
                    onCancel={onHide}
                />
            ) : (
                <Loading />
            )}
        </CardModal>
    );
}

export default EmployeeEditModal;
