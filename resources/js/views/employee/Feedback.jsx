import React, { useState, useEffect, useContext } from "react";
import withStyles from "react-jss";
import axios from "axios";

import AuthContext from "../../components/AuthContext";
import Card from "../../components/Card";
import Comments from "../../components/comments/Comments";
import FeedbackActions from "../../components/FeedbackActions";
import Loading from "../../components/Loading";
import { ApiRoutes } from "../../routes";
import FileViewer from "../../components/FileViewer";
import FileGallery from "../../components/FileGallery";

const styles = {
    info: {
        color: "#707070"
    }
};

function Feedback({ classes, match }) {
    const {
        feedbacks: feedbacksRoute,
        feedbackComments: commentsRoute
    } = ApiRoutes;

    const [feedback, setFeedback] = useState();
    const [comments, setComments] = useState();

    const feedbackId = match.params.id;

    const getFeedback = () => {
        axios
            .get(`${feedbacksRoute}/${feedbackId}`)
            .then(({ data }) => setFeedback(data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        getFeedback();
        getComments();
    }, []);

    const getComments = () => {
        axios
            .get(`${commentsRoute}?feedback_id=${feedbackId}`)
            .then(({ data }) => setComments(data))
            .catch(e => console.log(e));
    };

    const addComment = (commentBody, parentId = null) => {
        const newComment = {
            body: commentBody,
            feedback_id: feedback.id
        };

        if (parentId) newComment["parent_id"] = parentId;

        axios
            .post(commentsRoute, newComment)
            .then(() => {
                getComments();
            })
            .catch(e => console.log(e));
    };

    if (!feedback) return <Loading />;

    const {
        description,
        files,
        customer,
        group,
        created_at,
        status,
        response
    } = feedback;

    const infoBlock = (
        <>
            <Card title="Информация">
                <div className={classes.info}>
                    <p>
                        Отправитель: {customer ? customer.user.full_name : null}
                    </p>
                    <p>Группа: {group.name}</p>
                    <p>ПК: {customer ? customer.pc.name : null}</p>
                    <p>Дата: {created_at}</p>
                    <p style={{ color: status.color }}>Статус: {status.name}</p>
                </div>
            </Card>
            {response ? (
                <Card title="Отправленный ответ">
                    <p>{response.body}</p>
                </Card>
            ) : null}
            <FeedbackActions
                feedback={feedback}
                reloadFeedbackCallBack={getFeedback}
            />
        </>
    );

    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <Card title="Описание">
                        <p>{description}</p>
                    </Card>
                    <Card
                        title="Файлы"
                        info="Нет файлов"
                        showInfo={!files || files.length == 0}
                    >
                       <FileGallery files={files} size="medium"/>
                    </Card>
                    <div className="d-block d-lg-none">{infoBlock}</div>
                    <Comments comments={comments} addCallback={addComment} />
                </div>
                <div className="col-lg-4 pr-xl-5 d-none d-lg-block">
                    {infoBlock}
                </div>
            </div>
        </>
    );
}

export default withStyles(styles)(Feedback);
