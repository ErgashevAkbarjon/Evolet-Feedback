import React, { useState, useEffect } from "react";
import axios from "axios";
import withStyles from "react-jss";

import CardModal from "../../../components/CardModal";
import { ApiRoutes } from "../../../routes";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";

const styles = {
    employeeWrapper: {
        maxHeight: "15rem",
        overflowY: "auto"
    }
};

function GroupModal({
    classes,
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
                    {groupData.employees.length ? (
                        <div
                            className={
                                classes.employeeWrapper +
                                " list-group list-group-flush mb-3"
                            }
                        >
                            {groupData.employees.map((employee, i) => (
                                <Link
                                    to={'/employees/' + employee.id}
                                    className="list-group-item list-group-item-action"
                                    key={i}
                                >
                                    <div className="row align-items-center">
                                        <div className="col-1 p-0">
                                            <img
                                                src={employee.avatar}
                                                alt={employee.user.full_name}
                                                className="img-fluid rounded-circle"
                                            />
                                        </div>
                                        <div className="col">
                                            {employee.user.full_name}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-secondary text-center">
                            В данной группе нет сотрудников
                        </p>
                    )}
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

export default withStyles(styles)(GroupModal);
