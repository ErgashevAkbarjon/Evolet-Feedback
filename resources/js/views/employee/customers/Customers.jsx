import React, { useState, useEffect } from "react";
import axios from "axios";

import { ApiRoutes } from "../../../routes";
import Table from "../../../components/table/Table";
import CustomerRow from "../../../components/table/CustomerRow";
import NewCustomerModal from "./NewCustomerModal";
import CustomerModal from "./CustomerModal";
import CustomerEditModal from "./CustomerEditModal";
import CustomerDeleteModal from "./CustomerDeleteModal";
import TableTitle from "../../../components/table/Title";

const printables = [
    {
        name: "user.full_name",
        label: "Имя",
    },
    {
        name: "pc.logo",
        label: "ПК",
        sortColumn: "pc.name",
    },
    {
        name: "user.email",
        label: "Почта",
    },
    {
        name: "bonus",
        label: "Баллы",
    },
];

function Customers({ match }) {
    const [customers, setCustomers] = useState(null);
    const [sortQuery, setSortQuery] = useState("");
    const [paginationQuery, setPaginationQuery] = useState("");

    const [showNewCustomer, setShowNewCustomer] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [customerToEdit, setCustomerToEdit] = useState(null);

    const [customerToDelete, setCustomerToDelete] = useState(null);

    const fetchCustomer = (id) => {
        const customerURL = ApiRoutes.customers + "/" + id;
        axios
            .get(customerURL)
            .then(({ data }) => setSelectedCustomer(data))
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        if (match && match.params.hasOwnProperty("id")) {
            fetchCustomer(match.params.id);
        }
    }, [match]);

    const fetchCustomers = () => {
        const customersUrl =
            ApiRoutes.customers + "?" + sortQuery + paginationQuery;

        axios
            .get(customersUrl)
            .then(({ data, pagination }) => setCustomers({ data, pagination }))
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        updateCustomersList();
    }, [sortQuery, paginationQuery]);

    const onCustomerClick = (customer) => {
        setSelectedCustomer(customer);
    };

    const updateCustomersList = () => {
        setCustomers(null);
        fetchCustomers();
    };

    const onCustomerAdded = (customer) => {
        setShowNewCustomer(false);
        updateCustomersList();
    };

    const onCustomerEdit = (customer) => {
        setSelectedCustomer(null);
        setCustomerToEdit(customer);
    };

    const onCustomerUpdated = (customer) => {
        setCustomerToEdit(null);
        updateCustomersList();

        setSelectedCustomer(customer);
    };

    const onCustomerDelete = (customer) => {
        setSelectedCustomer(null);
        setCustomerToDelete(customer);
    };

    const onCustomerDeleted = () => {
        setCustomerToDelete(null);
        updateCustomersList();
    };

    const onSortCustomers = (sortQuery) => {
        if (!sortQuery) return;

        setSortQuery(sortQuery);
    };

    const onCustomersPageChanged = (page, perPage) => {
        setPaginationQuery(`&page=${page}&perPage=${perPage}`);
    };

    let customersList = null;
    let customersPagination = null;

    if (customers) {
        customersList = customers.data;
        customersPagination = customers.pagination;
    }

    return (
        <div>
            <TableTitle title="Пользователи">
                <div className="text-right">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowNewCustomer(true)}
                    >
                        Добавить
                    </button>
                </div>
            </TableTitle>
            <Table
                items={customersList}
                headers={printables}
                paginationData={customersPagination}
                onPageChange={onCustomersPageChanged}
                onSort={onSortCustomers}
                onPrintRow={(customer, i) => (
                    <CustomerRow
                        key={i}
                        customer={customer}
                        printableFields={printables}
                        onCustomerClick={onCustomerClick}
                    />
                )}
            />
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
    );
}

export default Customers;
