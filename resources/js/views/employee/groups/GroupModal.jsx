import React, { useState, useEffect } from "react";
import axios from "axios";
import withStyles from "react-jss";

import CardModal from "../../../components/CardModal";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import EmployeeList from "../../../components/UserList";

function GroupModal({
    group,
    show,
    onHide,
    onGroupEdit,
    onGroupDelete
}) {
    const [groupData, setGroupData] = useState();

    const fetchGroup = () => {
        if (!group) return;

        const singleGroupUrl = ApiRoutes.feedbackGroups + "/" + group.id;
        axios
            .get(singleGroupUrl)
            .then(({ data }) => {
                console.log(data);
                setGroupData(data);
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        setGroupData(null);
        fetchGroup();
    }, [group]);

    return group ? (
        <CardModal
            title={groupData ? groupData.name : "Группа"}
            show={show}
            onHide={onHide}
        >
            {groupData ? (
                <div>
                    <p>Сотрудники в группе {groupData.name}:</p>
                    <EmployeeList
                        users={groupData.employees.map(employee => ({
                            name: employee.user.full_name,
                            avatar: employee.avatar,
                            link: '/employees/' + employee.id
                        }))}
                        placeHolder="В данной группе нет сотрудников"
                    />
                    <div className="text-right">
                        <button
                            className="btn btn-danger mr-3 rounded-pill"
                            onClick={() => onGroupDelete(group)}
                        >
                            Удалить
                        </button>
                        <button
                            className="btn btn-success mr-3 rounded-pill"
                            onClick={() => onGroupEdit(group)}
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

export default GroupModal;
