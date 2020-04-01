import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import axios from "axios";

import Table from "../../components/table/Table";
import FeedbackRow from "../../components/table/FeedbackRow";
import Loading from "../../components/Loading";
import { ApiRoutes } from "../../routes";

const styles = {
    title: {
        color: "#707070",
        fontWeight: "400"
    },
    menuWrapper: {
        flexWrap: "nowrap",
        fontSize: "22px",
        color: "#707070",
        marginBottom: ".6em",
        paddingLeft: "15px"
    },
    menu: {
        cursor: "pointer"
    },
    menuActive: {
        borderBottom: "2px solid",
        borderColor: "#3C95D1",
        color: "#3C95D1"
    }
};

const printables = [
    {
        name: "description",
        label: "Отрывок описания"
    },
    {
        name: "created_at",
        label: "Дата"
    },
    {
        name: "customer.pc",
        label: "ПК",
        sortColumn: "customer.pc.name"
    },
    {
        name: "customer.user.full_name",
        label: "Отправитель"
    },
    {
        name: "status.name",
        label: "Статус"
    }
];

function Feedbacks({ classes, match }) {
    const {
        feedbacks: feedbacksRoute,
        feedbackGroups: groupsRoute
    } = ApiRoutes;

    const [feedbacks, setFeedbacks] = useState();
    const [title, setTitle] = useState("");
    const [feedbacksType, setType] = useState(1);
    const [sortQuery, setSortQuery] = useState("");

    const groupId = match.params.id;

    const filteredFeedbacksURL = `${feedbacksRoute}?group_id=${groupId}&type_id=${feedbacksType}${sortQuery}`;

    const fetchFeedbacks = () => {
        setFeedbacks(null);

        axios
            .get(filteredFeedbacksURL)
            .then(({ data }) => setFeedbacks(data))
            .catch(e => console.log(e));
    };

    const fetchGroupTitle = () => {
        setTitle("");

        axios
            .get(`${groupsRoute}/${groupId}?fields=name`)
            .then(({ data }) => setTitle(data.name))
            .catch(e => console.log(e));
    };

    useEffect(fetchFeedbacks, [filteredFeedbacksURL]);

    useEffect(fetchGroupTitle, [groupId]);

    const onSortFeedbacks = sortQuery => {
        setSortQuery(sortQuery);
    };

    return (
        <div className="row">
            <div className="col">
                <div className={"row " + classes.menuWrapper}>
                    <div
                        className={`${classes.menu} ${
                            feedbacksType === 1 ? classes.menuActive : ""
                        }`}
                        onClick={() => setType(1)}
                    >
                        <div className="mx-2 mb-1">Проблемы</div>
                    </div>
                    <div
                        className={`${classes.menu} ${
                            feedbacksType === 2 ? classes.menuActive : ""
                        }`}
                        onClick={() => setType(2)}
                    >
                        <div className="mx-2 mb-1">Идеи</div>
                    </div>
                </div>
                <h2 className={classes.title}>{title}</h2>
                <Table
                    headers={printables}
                    items={feedbacks}
                    onSort={onSortFeedbacks}
                    onPrintRow={(feedback, i) => (
                        <FeedbackRow
                            key={i}
                            feedback={feedback}
                            printableFields={printables}
                        />
                    )}
                />
            </div>
        </div>
    );
}

export default withStyles(styles)(Feedbacks);
