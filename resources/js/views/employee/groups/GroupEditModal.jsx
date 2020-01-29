import React, { useState } from "react";
import axios from "axios";

import FeedbackGroupForm from "../../../components/forms/FeedbackGroupForm";
import CardModal from "../../../components/CardModal";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";

function GroupEditModal({ group, show, onHide, onGroupUpdated }) {
    const [isSendingData, setSendingData] = useState(false);

    const onFormSubmit = groupData => {
        const updateGroupURL = ApiRoutes.feedbackGroups + "/" + group.id;

        setSendingData(true);

        axios
            .put(updateGroupURL, groupData)
            .then(({ data }) => {
                setSendingData(false);
                onGroupUpdated(data);
            })
            .catch(e => {
                console.log(e);
                setSendingData(false);
            });
    };

    return group ? (
        <div>
            <CardModal
                title="Изменить данные группы"
                show={show}
                onHide={onHide}
            >
                {!isSendingData ? (
                    <FeedbackGroupForm
                        group={group}
                        onSubmit={onFormSubmit}
                        onCancel={onHide}
                    />
                ) : (
                    <Loading />
                )}
            </CardModal>
        </div>
    ) : null;
}
export default GroupEditModal;
