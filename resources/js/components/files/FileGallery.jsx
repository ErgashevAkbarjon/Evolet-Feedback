import React, { useState } from "react";
import PropTypes from "prop-types";
import FileViewer from "./FileViewer";
import FileComponent from "./File";

function FileGallery({ files, size }) {
    const [selectedFile, setSelectedFile] = useState();

    let localFiles = files;

    if (!files) return null;

    localFiles = Array.from(files).map(f => {

        if (f instanceof File) {
            return { url: URL.createObjectURL(f), name: f.name };
        }

        return f;
    });

    return (
        <div className="row">
            {localFiles.map((file, i) => (
                <FileComponent
                    file={file}
                    onExpand={file => setSelectedFile(file)}
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
    files: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.instanceOf(FileList)
    ]),
    size: PropTypes.oneOf(["small", "medium", "large"])
};

export default FileGallery;
