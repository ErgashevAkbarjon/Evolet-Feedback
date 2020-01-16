import React, { useState } from "react";
import axios from "axios";

import PromoCompanyForm from "../../../components/forms/PromoCompanyForm";
import CardModal from "../../../components/CardModal";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";

function NewPromoCompanyModal({ show, onHide, onPCAdded }) {
    const [isSendingData, setSendingData] = useState(false);

    const onSubmit = formData => {
        setSendingData(true);

        axios
            .post(ApiRoutes.pc, formData, {
                "Content-Type": "multipart/form-data"
            })
            .then(r => {
                setSendingData(false);
                onPCAdded();
            })
            .catch(e => console.log(e));
    };

    return (
        <CardModal title="Новая промо компания" show={show} onHide={onHide}>
            {!isSendingData ? (
                <PromoCompanyForm onSubmit={onSubmit} onCancel={onHide} />
            ) : (
                <Loading />
            )}
        </CardModal>
    );
}
export default NewPromoCompanyModal;
