import React, { useState } from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import FileViewer from "./FileViewer";

const styles = {
    file: {
        width: "100%",
        borderRadius: "5px",
        cursor: "zoom-in"
    }
};

function FileGallery({ classes, files, size }) {
    const [selectedFile, setSelectedFile] = useState();

    let thumbnailCols = "col-4";

    switch (size) {
        case "small":
            thumbnailCols = "col-2";
            break;
        case "medium":
            thumbnailCols = "col-4";
            break;
        case "large":
            thumbnailCols = "col-6";
            break;
    }

    return (
        <div className="row">
            {files.map((file, i) => (
                <div className="col-8 col-md-6 col-lg-6 col-xl-4" key={i}>
                    <div className="row align-items-center">
                        <div className={thumbnailCols + " mb-3"}>
                            <img
                                src={file.url}
                                alt={file.name}
                                className={classes.file}
                                onClick={() => setSelectedFile(file.url)}
                            />
                        </div>
                        <div className="col pl-0">
                            {file.name && file.name.length > 10
                                ? file.name.slice(0, 10) + "..."
                                : file.name}
                        </div>
                    </div>
                </div>
            ))}
            {selectedFile ? (
                <FileViewer
                    file={selectedFile}
                    onHide={() => setSelectedFile(null)}
                />
            ) : null}
        </div>
    );
}

FileGallery.propTypes = {
    files: PropTypes.array.isRequired,
    size: PropTypes.oneOf(["small", "medium", "large"])
};

export default withStyles(styles)(FileGallery);
