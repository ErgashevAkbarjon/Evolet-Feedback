import React, { useState } from "react";
import PropTypes from "prop-types";
import FileViewer from "./FileViewer";
import File from "./File";

function FileGallery({ files, size }) {
    const [selectedFile, setSelectedFile] = useState();

    return (
        <div className="row">
            {files.map((file, i) => (
                <File
                    file={file}
                    onClick={file => setSelectedFile(file)}
                    size={size}
                    key={i}
                />
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

export default FileGallery;
