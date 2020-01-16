import React, { useState, useEffect } from "react";
import axios from "axios";
import withStyles from "react-jss";

import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";
import Table from "../../../components/table/Table";
import TableTitle from "../../../components/table/Title";
import NewPromoCompanyModal from "./NewPromoCompanyModal";
import PromoCompanyModal from "./PromoCompanyModal";
import PromoCompanyEditModal from "./PromoCompanyEditModal";
import PromoCompanyDeleteModal from "./PromoCompanyDeleteModal";

const styles = {
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            background: "#f5f5f5"
        }
    },
    logo: {
        width: "5.3rem"
    }
};

function PromoCompanies({ classes }) {
    const [promoCompanies, setPromoCompanies] = useState();

    const [showNewPC, setShowNewPC] = useState(false);
    const [selectedPC, setSelectedPC] = useState(null);
    const [PCToEdit, setPCToEdit] = useState(null);
    const [PCToDelete, setPCToDelete] = useState(null);

    const fetchPromoCompanies = () => {
        axios
            .get(ApiRoutes.pc)
            .then(({ data }) => {
                setPromoCompanies(data);
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetchPromoCompanies();
    }, []);

    const resetPCList = () => {
        setPromoCompanies(null);
        fetchPromoCompanies();
    };

    const onPCAdded = () => {
        setShowNewPC(false);
        resetPCList();
    };

    const onPCEdit = promoCompany => {
        setSelectedPC(null);
        setPCToEdit(promoCompany);
    };

    const onPCDelete = promoCompany => {
        setSelectedPC(null);
        setPCToDelete(promoCompany);
    };

    const onPCUpdated = updatedPC => {
        resetPCList();
        setPCToEdit(null);
        setSelectedPC(updatedPC);
    };

    const onPCDeleted = () => {
        setPCToDelete(null);
        resetPCList();
    };

    return promoCompanies ? (
        <div>
            <TableTitle title="Промо компании">
                <div className="text-right">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowNewPC(true)}
                    >
                        Добавить
                    </button>
                </div>
            </TableTitle>
            <div className="row">
                <div className="col-4">
                    <Table>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Логотип</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promoCompanies.map((pc, i) => (
                                <tr
                                    key={i}
                                    className={classes.tableRow}
                                    onClick={() => setSelectedPC(pc)}
                                >
                                    <td>{pc.name}</td>
                                    <td>
                                        <img
                                            src={pc.logo}
                                            className={
                                                classes.logo + " img-fluid"
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <NewPromoCompanyModal 
                show={showNewPC}
                onHide={() => setShowNewPC(null)}
                onPCAdded={onPCAdded}
            />
            <PromoCompanyModal
                promoCompany={selectedPC}
                show={selectedPC !== null}
                onHide={() => setSelectedPC(null)}
                onPCDelete={onPCDelete}
                onPCEdit={onPCEdit}
            />
            <PromoCompanyEditModal
                promoCompany={PCToEdit}
                show={PCToEdit !== null}
                onHide={() => setPCToEdit(null)}
                onPCUpdated={onPCUpdated}
            />
            <PromoCompanyDeleteModal
                promoCompany={PCToDelete}
                show={PCToDelete !== null}
                onHide={() => setPCToDelete(null)}
                onPCDeleted={onPCDeleted}
            />
        </div>
    ) : (
        <Loading />
    );
}
export default withStyles(styles)(PromoCompanies);
