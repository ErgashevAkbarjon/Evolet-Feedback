import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiRoutes } from "../../routes";
import withStyles from "react-jss";

import Loading from "../../components/Loading";
import Card from "../../components/Card";

const styles = {
    info: {
        color: "#707070"
    },
    file: {
        width: "100%",
        borderRadius: "5px"
    }
};

function Feedback({ classes, match }) {
    const feedbackId = match.params.id;
    const feedbackApiRoute = ApiRoutes.feedbacks + "/" + feedbackId;

    const [feedback, setFeedback] = useState();

    const fetchFeedback = () => {
        axios
            .get(feedbackApiRoute)
            .then(({ data }) => {
                console.log(data);
                setFeedback(data);
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    return feedback ? (
        <div>
            <Card title="Описание">
                <p>{feedback.description}</p>
            </Card>
            <Card title="Информация">
                <div className={classes.info}>
                    <p>{"Направление: " + feedback.group.name}</p>
                    <p>{"Дата: " + feedback.created_at}</p>
                    <p style={{ color: feedback.status.color }}>
                        {"Статус: " + feedback.status.name}
                    </p>
                </div>
            </Card>
            <Card
                title="Файлы"
                info="Нет файлов"
                showInfo={!feedback.files || feedback.files.length == 0}
            >
                <div className="row">
                    {feedback.files.map((file, i) => (
                        <div
                            className="col-8 col-md-6 col-lg-6 col-xl-4"
                            key={i}
                        >
                            <div className="row align-items-center">
                                <div className="col-6 mb-3">
                                    <img
                                        src={file.url}
                                        alt={file.name}
                                        className={classes.file}
                                    />
                                </div>
                                <div className="col pl-0">
                                    {file.name && file.name.length > 10
                                        ? file.name.slice(0, 10) + "..."
                                        : file.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            <Card
                title="Ответ"
                info="На ваш фидбек еще не ответили."
                showInfo={!feedback.response}
            >
                <p>{feedback.response ? feedback.response.body : null}</p>
            </Card>
        </div>
    ) : (
        <Loading />
    );
}

export default withStyles(styles)(Feedback);
