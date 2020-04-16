import React, { useState, useRef } from "react";
import withStyles from "react-jss";

const styles = {
    label: {
        "&::after": {
            content: '"Выбрать"'
        }
    },
    invalidLabel: {
        borderColor: "#dc3545",
        color: "#dc3545"
    }
};

const MAX_FILE_SIZE = 12582912; //12MB
const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / 1024 / 1024;

function FileInput({
    classes,
    label,
    multiple,
    accept,
    required,
    onFilesAdded
}) {
    const [localLabel, setLocalLabel] = useState(label);
    const [errorMessages, setErrorMessages] = useState([]);

    const fileInput = useRef(null);

    const getFileNames = files => {
        let names = "";

        for (const file of files) {
            names += `${file.name}, `;
        }

        return names.slice(0, names.length - 2); //trim last comma and space
    };

    const updateLabel = files => {
        if (files.length) {
            setLocalLabel(getFileNames(files));
        } else {
            setLocalLabel(label);
        }
    };

    const excludeLargeFiles = files => {
        let normalFiles = [];
        let largeFiles = [];

        setErrorMessages([]);

        for (const file of files) {
            if (file.size <= MAX_FILE_SIZE) {
                normalFiles.push(file);
            } else {
                largeFiles.push(file);
            }
        }

        setErrorMessages(
            largeFiles.map(
                f => `Размер файла ${f.name} больше ${MAX_FILE_SIZE_MB} MB `
            )
        );

        return normalFiles;
    };

    const handleFormValidationState = files => {
        if(!files.length && required){
            fileInput.current.setCustomValidity("Выберите файл");
        } else {
            fileInput.current.setCustomValidity("");
        }
    };

    const onInputChange = e => {
        let files = e.target.files;

        files = excludeLargeFiles(files);

        handleFormValidationState(files);

        updateLabel(files);

        onFilesAdded(multiple ? files : files[0]);
    };

    let labelClasses = `${classes.label} custom-file-label overflow-hidden text-secondary`;

    if (errorMessages.length) {
        labelClasses += ` ${classes.invalidLabel}`;
    }

    return (
        <div className="custom-file mb-3">
            <label htmlFor="attachment" className={labelClasses}>
                {localLabel}
            </label>
            <input
                type="file"
                className="custom-file-input"
                id="attachment"
                ref={fileInput}
                multiple={multiple}
                required={required}
                accept={accept || ""}
                onChange={onInputChange}
            />
            {errorMessages.map((message, i) => (
                <div className="invalid-feedback d-block" key={i}>
                    {message}
                </div>
            ))}
        </div>
    );
}

export default withStyles(styles)(FileInput);
