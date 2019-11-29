import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import axios from "axios";
import { Link } from "react-router-dom";

import { ApiRoutes } from "../../routes";
import Loading from "../../components/Loading";
import Card from "../../components/Card";

const btnColor = {
    background: "#B8CF41 !important",
    borderColor: "#B8CF41 !important"
};

const styles = {
    form: {
        "& .form-control:focus": {
            borderColor: btnColor.borderColor,
            boxShadow: "0 0 0 0.2rem rgba(184, 207, 65, 0.5) !important"
        },
        "& .btn": {
            ...btnColor,
            "&:hover, &:active": btnColor,
            "&:focus, &:active:focus": {
                boxShadow: "0 0 0 0.2rem rgba(184, 207, 65, 0.5) !important"
            }
        }
    }
};

function NewFeedback({ classes }) {
    const { feedbacks: feedbacksRoute } = ApiRoutes;

    const [isSendingData, setSendingData] = useState(false);

    const [feedbackGroups, setFeedbackGroups] = useState();

    const [type, setType] = useState(1);
    const [group, setGroup] = useState();
    const [description, setDescription] = useState();
    const [files, setFiles] = useState();

    const getFeedbackGroups = () => {
        axios
            .get(ApiRoutes.feedbackGroups)
            .then(({ data }) => setFeedbackGroups(data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        getFeedbackGroups();
    }, []);

    const onTypeChecked = ({ target }) => setType(target.value);
    const onGroupSelected = ({ target }) => setGroup(target.value);
    const onDescriptionChange = ({ target }) => setDescription(target.value);
    const onFilesAdded = ({ target }) => setFiles(target.files);

    const onFormSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("type_id", type);
        formData.append("group_id", group);
        formData.append("description", description);

        for (const file of files) {
            formData.append("files[]", file);
        }
        setSendingData(true);
        axios
            .post(feedbacksRoute, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(r => cleanForm())
            .catch(e => console.log(e));
    };

    const cleanForm = () => {
        setType(1);
        setGroup(feedbackGroups[0].id);
        setDescription("");
        setFiles(null);

        setSendingData(false);
    };

    return (
        <Card title="Новый фидбек">
            {feedbackGroups && !isSendingData ? (
                <form onSubmit={onFormSubmit} className={classes.form}>
                    <div className="mb-2">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="inlineRadio1"
                                value="1"
                                checked={type == 1}
                                onChange={onTypeChecked}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio1"
                            >
                                Проблема
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="inlineRadio2"
                                value="2"
                                checked={type == 2}
                                onChange={onTypeChecked}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio2"
                            >
                                Идея
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="feedback_group"></label>
                        Направление
                        <select
                            className="form-control"
                            id="feedback_group"
                            value={group}
                            onChange={onGroupSelected}
                        >
                            {feedbackGroups.map((group, i) => (
                                <option value={group.id} key={i}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Описание"
                            required
                            value={description}
                            onChange={onDescriptionChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">
                            Прикрепить файлы
                        </label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="exampleFormControlFile1"
                            multiple
                            onChange={onFilesAdded}
                        />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary">
                            Отправить
                        </button>
                    </div>
                </form>
            ) : (
                <Loading />
            )}
        </Card>
    );
}

export default withStyles(styles)(NewFeedback);
