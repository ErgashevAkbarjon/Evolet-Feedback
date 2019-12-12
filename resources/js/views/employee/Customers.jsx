import React, { useState, useEffect } from "react";
import axios from "axios";
import withStyles from 'react-jss';

import { ApiRoutes } from "../../routes";
import Table from "../../components/table/Table";
import Loading from "../../components/Loading";
import CustomerRow from "../../components/table/CustomerRow";
import NewCustomer from "./NewCustomer";

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

function Customers({classes}) {
    const [customers, setCustomers] = useState();

    const [modalShow, setModalShow] = useState(false);

    const fetchCustomers = () => {
        axios
            .get(ApiRoutes.customers)
            .then(({ data }) => {
                console.log(data);
                setCustomers(data);
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return customers ? (
        <div>
            <div className="row">
                <div className="col-8">
                    <h2 className={classes.title}>Пользователи</h2>
                </div>
                <div className="col text-right">
                    <button className="btn btn-outline-primary" onClick={()=> setModalShow(true)}>Добавить</button>
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
                        <CustomerRow customer={customer} printable={printable} key={i}/>
                    ))}
                </tbody>
            </Table>
           <NewCustomer show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    ) : (
        <Loading />
    );
}

export default withStyles(styles)(Customers);
