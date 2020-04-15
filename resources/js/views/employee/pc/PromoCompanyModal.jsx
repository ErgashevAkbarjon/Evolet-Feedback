import React, { useState, useEffect } from "react";
import axios from "axios";

import CardModal from "../../../components/CardModal";
import CustomerList from "../../../components/UserList";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";

function PromoCompanyModal({
    promoCompany,
    show,
    onHide,
    onPCEdit,
    onPCDelete
}) {
    const [promoCompanyData, setPromoCompanyData] = useState(null);

    const fetchPCData = () => {
        if (!promoCompany) return;

        const pcUrl = ApiRoutes.pc + "/" + promoCompany.id;
        axios
            .get(pcUrl)
            .then(({ data }) => setPromoCompanyData(data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        setPromoCompanyData(null);
        fetchPCData();
    }, [promoCompany]);

    return promoCompany ? (
        <CardModal title={promoCompany.name} show={show} onHide={onHide}>
            {promoCompanyData ? (
                <div>
                    <div className="mb-3">
                        <p className="mb-0 text-secondary">Логотип:</p>
                        <img
                            className="img-fluid img-thumbnail w-25"
                            src={promoCompanyData.logo}
                        />
                    </div>
                    <p className="mb-0 text-secondary">
                        Пользователи из промо компании:
                    </p>
                    <CustomerList
                        users={promoCompanyData.customers.map(customer => ({
                            name: customer.user.full_name,
                            link: "/customers/" + customer.id
                        }))}
                        placeHolder="В данной промо компании нет пользователей"
                    />
                    <div className="text-right">
                        <button
                            className="btn btn-danger rounded-pill mr-3"
                            onClick={() => onPCDelete(promoCompany)}
                        >
                            Удалить
                        </button>
                        <button
                            className="btn btn-success rounded-pill mr-3"
                            onClick={() => onPCEdit(promoCompany)}
                        >
                            Изменить
                        </button>
                        <button
                            className="btn btn-primary rounded-pill"
                            onClick={onHide}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </CardModal>
    ) : null;
}
export default PromoCompanyModal;
