import React, { useState, useEffect } from "react";

function FeedbackGroupForm({ group, onSubmit, onCancel }) {
    
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        if(group){
            setGroupName(group.name);
        }
    }, []);

    const handleInput = e => {
        setGroupName(e.target.value);
    };

    const onFormSubmit = e => {
        e.preventDefault();

        const newGroup = {
            name: groupName
        };

        onSubmit(newGroup);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="name">Название группы</label>
                <input
                    type="string"
                    className="form-control"
                    id="name"
                    value={groupName}
                    onChange={handleInput}
                    required
                />
            </div>
            <div className="text-right">
                <button
                    type="button"
                    className="btn btn-danger mr-3 rounded-pill"
                    onClick={onCancel}
                >
                    Отмена
                </button>
                <button type="submit" className="btn btn-success rounded-pill">
                    Сохранить
                </button>
            </div>
        </form>
    );
}
export default FeedbackGroupForm;
