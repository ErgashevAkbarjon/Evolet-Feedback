import React, { useState, useEffect, useContext } from "react";
import withStyles from "react-jss";
import axios from "axios";

import AuthContext from "../../components/AuthContext";
import Card from "../../components/Card";
import Comments from "../../components/Comments/Comments";
import FeedbackActions from "../../components/FeedbackActions";
import Loading from "../../components/Loading";
import { ApiRoutes } from "../../routes";
import FileViewer from "../../components/FileViewer";

const styles = {
    info: {
        color: "#707070"
    },
    file: {
        width: "100%",
        borderRadius: "5px",
        cursor: "zoom-in"
    }
};

function Feedback({ classes, match }) {
    const {
        feedbacks: feedbacksRoute,
        feedbackComments: commentsRoute
    } = ApiRoutes;

    const [feedback, setFeedback] = useState();
    const [comments, setComments] = useState();

    const [selectedFile, setSelectedFile] = useState();

    const authBearer = useContext(AuthContext);

    const jwtPayload = parseJwt(authBearer.auth); //FIXME It shoud execute once not on every re-rendering

    const user = jwtPayload.sub[0];

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
            author_id: user.id,
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

    return feedback ? (
        <>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <Card title="Описание">
                        <p>{feedback.description}</p>
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
                                        <div className="col-4 mb-3">
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className={classes.file}
                                                onClick={() =>
                                                    setSelectedFile(file.url)
                                                }
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
                </div>
                <div className="col-12 col-lg-4 pr-xl-5">
                    <Card title="Информация">
                        <div className={classes.info}>
                            <p>
                                {"Отправитель: " +
                                    feedback.customer.user.full_name}
                            </p>
                            <p>{"ПК: " + feedback.customer.pc.name}</p>
                            <p>{"Дата: " + feedback.created_at}</p>
                            <p style={{ color: feedback.status.color }}>
                                {"Статус: " + feedback.status.name}
                            </p>
                        </div>
                    </Card>
                    <FeedbackActions
                        feedback={feedback}
                        reloadFeedbackCallBack={getFeedback}
                    />
                </div>
                {selectedFile ? (
                    <FileViewer
                        file={selectedFile}
                        onHide={() => setSelectedFile(null)}
                    />
                ) : null}
            </div>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <Comments comments={comments} addCallback={addComment} />
                </div>
            </div>
        </>
    ) : (
        <Loading />
    );
}

export default withStyles(styles)(Feedback);
