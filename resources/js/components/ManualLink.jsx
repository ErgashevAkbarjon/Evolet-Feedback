import React from "react";
import axios from "axios";

function ManualLink() {
    const onButtonClick = () => {
        axios({
            url: "/api/manual",
            method: "GET",
            responseType: "blob"
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Evolet-Feedback-Manual.docx");
            link.click();
        });
    };

    return (
        <button
            className="btn btn-link text-decoration-none"
            onClick={onButtonClick}
        >
            Инструкция
        </button>
    );
}
export default ManualLink;
