import React, { useState, useEffect } from "react";
import axios from "axios";

import { ApiRoutes } from "../../../routes";
import Table from "../../../components/table/Table";
import EmployeeRow from "./EmployeeRow";
import Loading from "../../../components/Loading";
import EmployeeModal from "./EmployeeModal";
import EmployeeEditModal from "./EmployeeEditModal";
import NewEmployeeModal from "./NewEmployeeModal";
import EmployeeDeleteModal from "./EmployeeDeleteModal";
import TableTitle from "../../../components/table/Title";

const printableFields = {
    avatar: "Аватар",
    "user.full_name": "Имя",
    "user.email": "Почта"
};

function Employees({ match }) {
    const [employees, setEmployees] = useState(null);

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [showNewEmployee, setShowNewEmployee] = useState(false);

    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const fetchEmployee = id => {
        const employeeURL = ApiRoutes.employees + "/" + id;
        axios
            .get(employeeURL)
            .then(({ data }) => setSelectedEmployee(data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        if (match && match.params.hasOwnProperty("id")) {
            fetchEmployee(match.params.id);
        }
    }, [match]);

    const fetchEmployees = () => {
        axios
            .get(ApiRoutes.employees)
            .then(({ data }) => setEmployees(data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const resetEmployeeList = () => {
        setEmployees([]);
        fetchEmployees();
    };

    const employeeSelected = employee => {
        setSelectedEmployee(employee);
    };

    const onNewEmployeeAdded = () => {
        setShowNewEmployee(false);

        resetEmployeeList();
    };

    const onEmployeeEdit = employee => {
        setSelectedEmployee(null);
        setEmployeeToEdit(employee);
    };

    const onEmployeeDelete = employee => {
        setSelectedEmployee(null);
        setEmployeeToDelete(employee);
    };

    const onEmployeeUpdated = employee => {
        setEmployeeToEdit(null);
        resetEmployeeList();

        setSelectedEmployee(employee);
    };

    const onEmployeeDeleted = employee => {
        setEmployeeToDelete(null);

        resetEmployeeList();
    };

    return employees ? (
        <div>
            <TableTitle title="Сотрудники">
                <div className="text-right">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowNewEmployee(true)}
                    >
                        Добавить
                    </button>
                </div>
            </TableTitle>
            <Table>
                <thead>
                    <tr>
                        {Object.values(printableFields).map((field, i) => (
                            <th key={i}>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(employees)
                        ? employees.map((employee, i) => (
                              <EmployeeRow
                                  key={i}
                                  employee={employee}
                                  printables={printableFields}
                                  onClick={employeeSelected}
                              />
                          ))
                        : null}
                </tbody>
            </Table>
            <NewEmployeeModal
                show={showNewEmployee}
                onHide={() => setShowNewEmployee(false)}
                onNewEmployeeAdded={onNewEmployeeAdded}
            />
            <EmployeeModal
                employee={selectedEmployee}
                show={selectedEmployee !== null}
                onHide={() => setSelectedEmployee(null)}
                onEdit={onEmployeeEdit}
                onDelete={onEmployeeDelete}
            />
            <EmployeeEditModal
                employee={employeeToEdit}
                show={employeeToEdit !== null}
                onHide={() => setEmployeeToEdit(null)}
                onEmployeeUpdated={onEmployeeUpdated}
            />
            <EmployeeDeleteModal
                employee={employeeToDelete}
                show={employeeToDelete !== null}
                onHide={() => setEmployeeToDelete(null)}
                onEmployeeDeleted={onEmployeeDeleted}
            />
        </div>
    ) : (
        <Loading />
    );
}

export default Employees;
