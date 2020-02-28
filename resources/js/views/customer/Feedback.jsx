import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiRoutes } from "../../routes";
import withStyles from "react-jss";

import Loading from "../../components/Loading";
import Card from "../../components/Card";
import FileGallery from "../../components/files/FileGallery";

const styles = {
    info: {
        color: "#707070"
    }
};

function Feedback({ classes, match }) {
    const feedbackId = match.params.id;
    const feedbackApiRoute = ApiRoutes.feedbacks + "/" + feedbackId;

    const [feedback, setFeedback] = useState();

    const fetchFeedback = () => {
        axios
            .get(feedbackApiRoute)
            .then(({ data }) => setFeedback(data))
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
                    <p>{"Тип: " + feedback.type.name}</p>
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
                <FileGallery files={feedback.files} size="large"/>
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
