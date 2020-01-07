import React, { useState, useEffect } from "react";
import axios from "axios";

import { ApiRoutes } from "../../routes";
import Loading from "../Loading";
import MultipleSelect from "./MultipleSelect";

function EmployeeForm({ employee, onSubmit, onCancel }) {
    let employeeGroups = [];

    if (employee) {
        employeeGroups = employee.groups.map(g => g.id);
    }

    const [feedbackGroups, setFeedbackGroups] = useState();

    const [fullName, setFullName] = useState(
        employee ? employee.user.full_name : ""
    );
    const [email, setEmail] = useState(employee ? employee.user.email : "");
    const [avatar, setAvatar] = useState(null);
    const [groups, setGroups] = useState([]);

    const fetchFeedbackGroups = () => {
        axios
            .get(ApiRoutes.feedbackGroups)
            .then(({ data }) => setFeedbackGroups(data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        setGroups(employeeGroups);
        fetchFeedbackGroups();
    }, []);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        switch (name) {
            case "full_name":
                setFullName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "groups":
                setGroups(value);
                break;
            case "avatar":
                setAvatar(target.files[0]);
                break;
        }
    };

    const onFormSubmit = e => {
        e.preventDefault();
        
        console.log({
            fullName,
            email,
            groups,
            avatar
        });
        
        const formData = new FormData();

        formData.append("full_name", fullName);
        formData.append("email", email);
        formData.append("groups", JSON.stringify(groups));
        formData.append("avatar", avatar);

        onSubmit(formData);
    };

    return feedbackGroups ? (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="full_name">Имя</label>
                <input
                    type="string"
                    className="form-control"
                    id="full_name"
                    name="full_name"
                    required
                    value={fullName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={handleInputChange}
                />
            </div>
            <MultipleSelect
                label="Фидбек группы"
                items={feedbackGroups}
                itemValue="id"
                itemText="name"
                name="groups"
                value={groups}
                onChange={handleInputChange}
            />
            <div className="form-group">
                <label htmlFor="avatar">Аватар</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="avatar"
                    name="avatar"
                    onChange={handleInputChange}
                />
            </div>

            <div className="text-right">
                <button
                    type="button"
                    className="btn btn-primary rounded-pill mr-3"
                    onClick={onCancel}
                >
                    Отмена
                </button>
                <button type="submit" className="btn btn-success rounded-pill">
                    Сохранить
                </button>
            </div>
        </form>
    ) : (
        <Loading />
    );
}
export default EmployeeForm;
