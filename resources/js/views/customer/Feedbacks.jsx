import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import withStyles from "react-jss";

import { ApiRoutes } from "../../routes";
import Loading from "../../components/Loading";
import Card from "../../components/Card";

const styles = {
    mainWrapper: {
        maxHeight: "30rem",
        overflowY: "scroll"
    }
};

function Feedbacks({ classes }) {
    const [feedbacks, setFeedbacks] = useState();

    const fetchFeedbacks = () => {
        axios
            .get(ApiRoutes.feedbacks)
            .then(r => {
                if (r.hasOwnProperty("data")) {
                    setFeedbacks(r.data);
                } else {
                    setFeedbacks([]);
                }
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return feedbacks ? (
        <Card
            title="История фидбеков"
            info="У вас нет фидбеков"
            showInfo={Array.isArray(feedbacks) && feedbacks.length == 0}
        >
            <div className={classes.mainWrapper}>
                <div className="list-group">
                    {feedbacks.map((feedback, i) => (
                        <Link
                            key={i}
                            to={"/customer/feedbacks/" + feedback.id}
                            className="list-group-item list-group-item-action"
                        >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">
                                    {feedback.description.length > 10
                                        ? feedback.description.slice(0, 10) +
                                          "..."
                                        : feedback.description}
                                </h5>
                                <small
                                    style={{
                                        color: feedback.status.color
                                    }}
                                >
                                    {feedback.status.name}
                                </small>
                            </div>
                            <small>{feedback.group.name}</small>
                        </Link>
                    ))}
                </div>
            </div>
        </Card>
    ) : (
        <Loading />
    );
}

export default withStyles(styles)(Feedbacks);
