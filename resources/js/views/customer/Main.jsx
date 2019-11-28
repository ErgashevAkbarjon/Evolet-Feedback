import React, { useState } from "react";
import withStyles from "react-jss";
import axios from 'axios';
// import { Switch, Route } from "react-router-dom";

// import Sidebar from "../../components/Sidebar";
// import { EmployeeRoutes } from "../../routes";
import { ApiRoutes } from '../../routes';

const btnColor = {
    background: "#B8CF41 !important",
    borderColor: "#B8CF41 !important"
};

const styles = {
    container: {
        "& .form-control:focus": {
            borderColor: btnColor.borderColor,
            boxShadow: "0 0 0 0.2rem rgba(184, 207, 65, 0.5) !important"
        },
        "& .btn": {
            padding: "0.75em 0",
            ...btnColor,
            "&:hover, &:active": btnColor,
            "&:focus, &:active:focus": {
                boxShadow: "0 0 0 0.2rem rgba(184, 207, 65, 0.5) !important"
            }
        }
    },
};

function Main({classes}) {
    const { feedbacks: feedbacksRoute } = ApiRoutes;
    
    const [type, setType] = useState(1);
    const [group, setGroup] = useState();
    const [description, setDescription] = useState();
    const [files, setFiles] = useState();

    const onTypeChecked = ({target}) => setType(target.value);
    const onGroupSelected = ({target}) => setGroup(target.value);
    const onDescriptionChange = ({target}) => setDescription(target.value);
    const onFilesAdded = ({target}) => setFiles(target.files);

    const onFormSubmit = (e) => {
        e.preventDefault();
        
        console.log("formData");

        const formData = new FormData();
        formData.append('type_id', type);
        formData.append('group_id', group);
        formData.append('description', description);

        for (const file of files) {
            formData.append('files[]', file);
        }
        
        axios
            .post(feedbacksRoute, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((r) => console.log(r))
            .catch((e) => console.log(e));

    }

    return (
        <div className={classes.container + " container-fluid h-100"}>
            <div className="row d-flex justify-content-center align-content-center h-100">
                <div className="col-4">
                    <h2 className="mb-4">Новый feedback</h2>
                    <form onSubmit={onFormSubmit}>
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
                                <option value="1">Упаковка</option>
                                <option value="2">Инструкция</option>
                                <option value="3">Сайт</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder='Описание'
                                required
                                value={description}
                                onChange={onDescriptionChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile1">Прикрепить файлы</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" multiple onChange={onFilesAdded}/>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                            >
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(Main);
