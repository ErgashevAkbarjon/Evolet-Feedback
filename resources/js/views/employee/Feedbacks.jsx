import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import axios from "axios";

import Table from "../../components/table/Table";
import FeedbackRow from "../../components/FeedbackRow";
import Loading from '../../components/Loading';

const styles = {
    title: {
        color: "#707070",
        fontWeight: "400"
    },
    menuWrapper: {
        width: "10%",
        flexWrap: "nowrap",
        fontSize: "22px",
        color: "#707070",
        marginBottom: ".6em",
        paddingLeft: "15px"
    },
    menu: {
        cursor: "pointer",
        paddingBottom: " 6px"
    },
    menuActive: {
        borderBottom: "2px solid",
        borderColor: "#3C95D1",
        color: "#3C95D1"
    }
};

const printable = {
    description: "Отрывок описания",
    created_at: "Дата",
    "customer.pc": "ПК",
    "customer.user.full_name": "Отправитель",
    "status.name": "Статус"
};

function Feedbacks({ classes, match }) {
    const [feedbacks, setFeedbacks] = useState();
    const [title, setTitle] = useState("");
    const [feedbacksType, setType] = useState(1);

    const groupId = match.params.id;

    const filteredFeedbacksURL = `/api/feedbacks?group_id=${groupId}&type_id=${feedbacksType}`;

    useEffect(() => {
        axios
            .get(filteredFeedbacksURL)
            .then(({ data }) => setFeedbacks(data))
            .catch(e => console.log(e));
        axios
            .get("/api/groups?id=" + groupId)
            .then(({ data }) => setTitle(data[0].name))
            .catch(e => console.log(e));
    }, [filteredFeedbacksURL]);

    return (
        <div className="row">
            <div className="col">
                <div className={"row " + classes.menuWrapper}>
                    <div
                        className={`col ${classes.menu} ${
                            feedbacksType === 1 ? classes.menuActive : ""
                        }`}
                        onClick={() => setType(1)}
                    >
                        Проблемы
                    </div>
                    <div
                        className={`col ${classes.menu} ${
                            feedbacksType === 2 ? classes.menuActive : ""
                        }`}
                        onClick={() => setType(2)}
                    >
                        Идеи
                    </div>
                </div>
                <h2 className={classes.title}>{title}</h2>
                {feedbacks ? (
                    <Table>
                        <thead>
                            <tr>
                                {Object.values(printable).map(
                                    (fieldName, i) => (
                                        <th key={i}>{fieldName}</th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback, i) => (
                                <FeedbackRow
                                    key={i}
                                    feedback={feedback}
                                    printableFields={Object.keys(printable)}
                                />
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}

export default withStyles(styles)(Feedbacks);
