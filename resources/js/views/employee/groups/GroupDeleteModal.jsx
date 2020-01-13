import React, { useState } from "react";
import axios from "axios";

import CardModal from "../../../components/CardModal";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";

function GroupDeleteModal({ group, show, onHide, onGroupDeleted }) {
    const [isSendingData, setSendingData] = useState(false);

    const deleteGroup = () => {
        const groupDeleteURL = ApiRoutes.feedbackGroups + "/" + group.id;

        setSendingData(true);

        axios
            .delete(groupDeleteURL)
            .then(() => {
                setSendingData(false);
                onGroupDeleted();
            })
            .catch(e => console.log(e));
    };

    return group ? (
        <CardModal title="Удаление группы" show={show} onHide={onHide}>
            {!isSendingData ? (
                <>
                    <p className="text-center">
                        Вы действительно хотите удалить
                        <br />
                        группу <b>{group.name}</b> и все ее фидбеки ?
                    </p>
                    <div className="text-center">
                        <button
                            className="btn btn-danger mr-3 rounded-pill px-4"
                            onClick={deleteGroup}
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
                </>
            ) : (
                <Loading />
            )}
        </CardModal>
    ) : null;
}
export default GroupDeleteModal;
