import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/table/Title";

const settingItems = [
    {
        link: "/customers",
        text: "Пользователи"
    },
    {
        link: "/employees",
        text: "Сотрудники"
    },
    {
        link: "/groups",
        text: "Группы"
    },
    {
        link: "/pc",
        text: "Промо компании"
    }
];

function Settings() {
    return (
        <div className="col-4">
            <Title title="Настройки" />
            <div className="list-group">
                {settingItems.map((setting, i) => (
                    <Link
                        to={setting.link}
                        className="list-group-item list-group-item-action"
                        key={i}
                    >
                        {setting.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default Settings;
