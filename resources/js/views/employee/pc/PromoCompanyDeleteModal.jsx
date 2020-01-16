import React from "react";
import axios from 'axios';

import CardModal from "../../../components/CardModal";
import { ApiRoutes } from "../../../routes";

function PromoCompanyDeleteModal({ promoCompany, show, onHide, onPCDeleted }) {

    const deletePC = () => {
        const pcDeleteURL = ApiRoutes.pc + '/' + promoCompany.id;
        
        axios
            .delete(pcDeleteURL)
            .then(r => onPCDeleted())
            .catch(e => console.log(e));
    };

    return promoCompany ? (
        <CardModal title="Удаление промо компании" show={show} onHide={onHide}>
            <p className="text-center">
                Вы действительно хотите удалить промо компанию
                <br />
                <b>{promoCompany.name}?</b>
            </p>
            <div className="text-center">
                <button
                    className="btn btn-danger mr-3 rounded-pill px-4"
                    onClick={deletePC}
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
export default PromoCompanyDeleteModal;
