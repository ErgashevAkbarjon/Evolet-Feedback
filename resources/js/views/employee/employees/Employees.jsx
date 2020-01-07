import React, { useState, useEffect } from "react";
import axios from "axios";
import withStyles from "react-jss";

import { ApiRoutes } from "../../../routes";
import Table from "../../../components/table/Table";
import EmployeeRow from "./EmployeeRow";
import Loading from "../../../components/Loading";
import EmployeeModal from "./EmployeeModal";
import EmployeeEditModal from "./EmployeeEditModal";
import NewEmployeeModal from "./NewEmployeeModal";
import EmployeeDeleteModal from "./EmployeeDeleteModal";

const styles = {
    title: {
        color: "#707070",
        fontWeight: "400"
    }
};

const printableFields = {
    avatar: "Аватар",
    "user.full_name": "Имя",
    "user.email": "Почта"
};

function Employees({ classes }) {
    const [employees, setEmployees] = useState();

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [showNewEmployee, setShowNewEmployee] = useState(false);

    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const fetchEmployees = () => {
        axios
            .get(ApiRoutes.employees)
            .then(({ data }) => {
                console.log(data);
                setEmployees(data);
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const resetEmployeeList = () => {
        setEmployees(null);
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
            <div className="row">
                <div className="col-8">
                    <h2 className={classes.title}>Сотрудники</h2>
                </div>
                <div className="col text-right">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowNewEmployee(true)}
                    >
                        Добавить
                    </button>
                </div>
            </div>
            <Table>
                <thead>
                    <tr>
                        {Object.values(printableFields).map((field, i) => (
                            <th key={i}>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, i) => (
                        <EmployeeRow
                            key={i}
                            employee={employee}
                            printables={printableFields}
                            onClick={employeeSelected}
                        />
                    ))}
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

export default withStyles(styles)(Employees);