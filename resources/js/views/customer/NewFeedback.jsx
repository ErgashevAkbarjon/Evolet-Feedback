import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import axios from "axios";

import { ApiRoutes } from "../../routes";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import CardModal from "../../components/CardModal";
import FileGallery from "../../components/files/FileGallery";

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
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [feedbackGroups, setFeedbackGroups] = useState();

    const [type, setType] = useState(1);
    const [group, setGroup] = useState();
    const [description, setDescription] = useState();
    const [files, setFiles] = useState([]);

    const getFeedbackGroups = () => {
        axios
            .get(ApiRoutes.feedbackGroups)
            .then(({ data }) => {
                setGroup(data[0].id); //TODO Needs a refactor
                setFeedbackGroups(data);
            })
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

        setShowConfirmModal(true);
    };

    const sendNewFeedback = () => {
        setShowConfirmModal(false);

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
        setGroup(feedbackGroups[0].id); //TODO Needs a refactor
        setDescription("");
        setFiles([]);

        setSendingData(false);
    };

    return (
        <>
            <Card title="Новый фидбек">
                {feedbackGroups && !isSendingData ? (
                    <form onSubmit={onFormSubmit} className={classes.form}>
                        <div className="mb-2">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="problemRadio"
                                    value="1"
                                    checked={type == 1}
                                    onChange={onTypeChecked}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="problemRadio"
                                >
                                    Проблема
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="ideaRadio"
                                    value="2"
                                    checked={type == 2}
                                    onChange={onTypeChecked}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="ideaRadio"
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
                                rows="3"
                                placeholder="Описание"
                                required
                                value={description}
                                onChange={onDescriptionChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="attachment">
                                Прикрепить изображения
                            </label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="attachment"
                                multiple
                                onChange={onFilesAdded}
                                accept="image/*"
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

            {feedbackGroups ? (
                <CardModal
                    title="Подтверждение введеных данных"
                    show={showConfirmModal}
                    onHide={() => setShowConfirmModal(false)}
                >
                    <p>
                        Вы не сможете изменить данные фидбека, проверьте
                        правильность заполненных данных:
                    </p>

                    <p>
                        <span>Тип фидбека: </span>
                        <b>
                            {type == 1 ? "Проблема" : type == 2 ? "Идея" : null}
                        </b>
                    </p>

                    <p>
                        <span>Направление: </span>
                        <b>
                            {feedbackGroups.filter(g => g.id == group)[0].name}
                        </b>
                    </p>

                    <p>Описание фидбека:</p>
                    <p>
                        <b>{description}</b>
                    </p>

                    <p>Прикрепленные изображения:</p>

                    <div className="mb-4">
                        <FileGallery files={files} size="large" />
                    </div>

                    <div className="text-right">
                        <button
                            className="btn btn-success rounded-pill mr-3"
                            onClick={() => sendNewFeedback()}
                        >
                            Отправить
                        </button>
                        <button
                            className="btn btn-primary rounded-pill"
                            onClick={() => setShowConfirmModal(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </CardModal>
            ) : null}
        </>
    );
}

export default withStyles(styles)(NewFeedback);
