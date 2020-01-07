import React, { useState, useEffect } from "react";
import axios from "axios";
import withStyles from "react-jss";

import { ApiRoutes } from "../../../routes";
import Table from "../../../components/table/Table";
import Loading from "../../../components/Loading";
import CustomerRow from "../../../components/table/CustomerRow";
import NewCustomerModal from "./NewCustomerModal";
import CustomerModal from "./CustomerModal";
import CustomerEditModal from "./CustomerEditModal";
import CustomerDeleteModal from "./CustomerDeleteModal";

const styles = {
    title: {
        color: "#707070",
        fontWeight: "400"
    }
};

const printable = {
    "user.full_name": "Имя",
    "pc.logo": "ПК",
    bonus: "Баллы"
};

function Customers({ classes }) {
    const [customers, setCustomers] = useState();

    const [showNewCustomer, setShowNewCustomer] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [customerToEdit, setCustomerToEdit] = useState(null);

    const [customerToDelete, setCustomerToDelete] = useState(null);

    const fetchCustomers = () => {
        axios
            .get(ApiRoutes.customers)
            .then(({ data }) => setCustomers(data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const onCustomerClick = customer => {
        setSelectedCustomer(customer);
    };

    const updateCustomersList = () => {
        setCustomers(null);
        fetchCustomers();
    };

    const onCustomerAdded = customer => {
        setShowNewCustomer(false);
        updateCustomersList();
    };

    const onCustomerEdit = customer => {
        setSelectedCustomer(null);
        setCustomerToEdit(customer);
    };

    const onCustomerUpdated = customer => {
        setCustomerToEdit(null);
        updateCustomersList();

        setSelectedCustomer(customer);
    };

    const onCustomerDelete = customer => {
        setSelectedCustomer(null);
        setCustomerToDelete(customer);
    };

    const onCustomerDeleted = () => {
        setCustomerToDelete(null);
        updateCustomersList();
    };

    return customers ? (
        <div>
            <div className="row">
                <div className="col-8">
                    <h2 className={classes.title}>Пользователи</h2>
                </div>
                <div className="col text-right">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowNewCustomer(true)}
                    >
                        Добавить
                    </button>
                </div>
            </div>
            <Table>
                <thead>
                    <tr>
                        {Object.values(printable).map((fieldName, i) => (
                            <th key={i}>{fieldName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, i) => (
                        <CustomerRow
                            customer={customer}
                            printable={printable}
                            onCustomerClick={onCustomerClick}
                            key={i}
                        />
                    ))}
                </tbody>
            </Table>
            <NewCustomerModal
                show={showNewCustomer}
                onHide={() => setShowNewCustomer(false)}
                onCustomerAdded={onCustomerAdded}
            />
            <CustomerModal
                customer={selectedCustomer}
                show={selectedCustomer !== null}
                onHide={() => setSelectedCustomer(null)}
                onCustomerEdit={onCustomerEdit}
                onDelete={onCustomerDelete}
            />
            <CustomerEditModal
                customer={customerToEdit}
                show={customerToEdit !== null}
                onHide={() => setCustomerToEdit(null)}
                onCustomerUpdated={onCustomerUpdated}
            />
            <CustomerDeleteModal
                customer={customerToDelete}
                show={customerToDelete !== null}
                onHide={() => setCustomerToDelete(null)}
                onCustomerDeleted={onCustomerDeleted}
            />
        </div>
    ) : (
        <Loading />
    );
}

export default withStyles(styles)(Customers);