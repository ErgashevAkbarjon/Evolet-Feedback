import React, { useState, useEffect } from "react";
import axios from "axios";

import { ApiRoutes } from "../../routes";
import Loading from "../Loading";
import MultipleSelect from "./MultipleSelect";
import FileInput from "./FileInput";

function EmployeeForm({
    employee,
    onSubmit,
    onCancel,
    validationErrors: validationErrorsProp
}) {
    const [groupsList, setGroupsList] = useState();
    const [rolesList, setRolesList] = useState([]);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState();
    const [avatar, setAvatar] = useState(null);
    const [groups, setGroups] = useState([]);

    const [validationErrors, setValidationErrors] = useState();

    let mounted;

    const fetchFeedbackGroups = () => {
        axios
            .get(ApiRoutes.feedbackGroups)
            .then(({ data }) => {
                if (mounted) setGroupsList(data);
            })
            .catch(e => console.log(e));
    };

    const fetchUserRoles = () => {
        axios
            .get(ApiRoutes.roles)
            .then(({ data }) => {
                if (!mounted) return;

                setRolesList(data);
                if (!employee) {
                    setRole(data[0].id);
                }
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        mounted = true;
        fetchFeedbackGroups();
        fetchUserRoles();

        return () => (mounted = false);
    }, []);

    useEffect(() => {
        if (!employee) return;

        const { user, groups } = employee;

        setFullName(user.full_name);
        setEmail(user.email);
        setGroups(groups.map(g => g.id));
        setRole(user.roles[0].id);
    }, [employee]);

    useEffect(() => {
        setValidationErrors(validationErrorsProp);
    }, [validationErrorsProp]);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        if (validationErrors && validationErrors.hasOwnProperty(name)) {
            let resetedInputErrors = validationErrors;
            resetedInputErrors[name] = null;

            setValidationErrors(resetedInputErrors);
        }

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
            case "role":
                setRole(value);
                break;
        }
    };

    const onAvatarChange = image => {
        setAvatar(image);
    };

    const onFormSubmit = e => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("full_name", fullName);
        formData.append("email", email);
        formData.append("groups", JSON.stringify(groups));
        formData.append("role", role);
        formData.append("avatar", avatar);

        onSubmit(formData);
    };

    const emailErrors = validationErrors ? validationErrors.email : null;

    return groupsList && rolesList ? (
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
                    className={
                        emailErrors ? "form-control is-invalid" : "form-control"
                    }
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={handleInputChange}
                />
                {emailErrors
                    ? emailErrors.map((error, i) => (
                          <div className="invalid-feedback" key={i}>
                              {error}
                          </div>
                      ))
                    : null}
            </div>
            <MultipleSelect
                label="Фидбек группы"
                items={groupsList}
                itemValue="id"
                itemText="name"
                name="groups"
                value={groups}
                onChange={handleInputChange}
            />
            <div className="form-group">
                <label htmlFor="rolesSelector">Роль</label>
                <select
                    className="form-control"
                    id="rolesSelector"
                    name="role"
                    value={role}
                    onChange={handleInputChange}
                >
                    {rolesList.map((role, i) => (
                        <option value={role.id} key={i}>
                            {role.name}
                        </option>
                    ))}
                </select>
            </div>
            <FileInput
                label="Аватар"
                onFilesAdded={onAvatarChange}
                accept="image/*"
            />
            <div className="text-right">
                <button
                    type="submit"
                    className="btn btn-success rounded-pill mr-3"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    className="btn btn-primary rounded-pill"
                    onClick={onCancel}
                >
                    Отмена
                </button>
            </div>
        </form>
    ) : (
        <Loading />
    );
}
export default EmployeeForm;
