import React from "react";

function ManualLink() {
    const onButtonClick = () => {
        window.downloadFile("/api/manual", "Evolet-Feedback-Manual.docx");
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
