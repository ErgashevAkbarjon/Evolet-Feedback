import React from "react";
import axios from "axios";

import { ApiRoutes } from "../../../routes";
import CardModal from "../../../components/CardModal";

function EmployeeDeleteModal({ employee, show, onHide, onEmployeeDeleted }) {
    const deleteEmployee = () => {
        const employeeDeleteUrl = ApiRoutes.employees + "/" + employee.id;
        axios
            .delete(employeeDeleteUrl)
            .then(() => onEmployeeDeleted())
            .catch(e => console.log(e));
    };

    return employee ? (
        <CardModal show={show} onHide={onHide} title="Удаление сотрудника">
            <p className="text-center">
                Вы действительно хотите удалить сотрудника
                <br />
                <b>{employee.user.full_name}</b>
            </p>
            <div className="text-center">
                <button
                    className="btn btn-danger mr-3 rounded-pill px-4"
                    onClick={deleteEmployee}
                >
                    Да
                </button>
                <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={onHide}
                >
                    Нет
                </button>
            </div>
        </CardModal>
    ) : null;
}

export default EmployeeDeleteModal;
