import React, { useState } from "react";
import axios from "axios";

import CardModal from "../../../components/CardModal";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";
import FeedbackGroupForm from "../../../components/forms/FeedbackGroupForm";

function NewGroupModal({ show, onHide, onGroupAdded }) {
    const [isSendingData, setSendingData] = useState(false);

    const onSubmit = newGroup => {
        
        setSendingData(true);

        axios
            .post(ApiRoutes.feedbackGroups, newGroup)
            .then(() => {
                setSendingData(false);
                onGroupAdded();
            })
            .catch(e => {
                setSendingData(false);
                console.log(e);
            });
    };

    return (
        <CardModal title="Новая группа" show={show} onHide={onHide}>
            {!isSendingData ? (
                <FeedbackGroupForm
                    onSubmit={onSubmit}
                    onCancel={onHide}
                />
            ) : (
                <Loading />
            )}
        </CardModal>
    );
}

export default NewGroupModal;
