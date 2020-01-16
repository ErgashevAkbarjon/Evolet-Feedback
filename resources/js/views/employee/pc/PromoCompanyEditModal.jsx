import React, { useState } from "react";
import axios from "axios";

import CardModal from "../../../components/CardModal";
import PromoCompanyForm from "../../../components/forms/PromoCompanyForm";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";

function PromoCompanyEditModal({ promoCompany, show, onHide, onPCUpdated }) {
    const [isSendingData, setSendingData] = useState(false);

    const onFormSubmit = formData => {
        const pcUpdateURL = ApiRoutes.pc + "/" + promoCompany.id;

        //Bacause of restricion of php that can recognize multipart/form-data
        //only with POST method we will send it with POST method but with trick of "_method" input
        //so Lumen wil recognize it as PUT
        formData.append("_method", "put");

        setSendingData(true);

        axios
            .post(pcUpdateURL, formData)
            .then(({ data }) => {
                setSendingData(false);
                onPCUpdated(data);
            })
            .catch(e => console.log(e));
    };

    return promoCompany ? (
        <CardModal
            title="Изменение данных промо компании"
            show={show}
            onHide={onHide}
        >
            {!isSendingData ? (
                <PromoCompanyForm
                    promoCompany={promoCompany}
                    onSubmit={onFormSubmit}
                    onCancel={onHide}
                />
            ) : (
                <Loading />
            )}
        </CardModal>
    ) : null;
}
export default PromoCompanyEditModal;
