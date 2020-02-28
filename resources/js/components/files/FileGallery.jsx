import React, { useState } from "react";
import PropTypes from "prop-types";
import FileViewer from "./FileViewer";
import File from "./File";

function FileGallery({ files, size }) {
    const [selectedFile, setSelectedFile] = useState();

    let localFiles = files;

    if(files instanceof FileList){
        localFiles = Array.from(files).map(f => ({
            url: URL.createObjectURL(f),
            name: f.name
        }));
    }

    return localFiles ? (
        <div className="row">
            {localFiles.map((file, i) => (
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
    ) : null;
}

FileGallery.propTypes = {
    files: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.instanceOf(FileList),
    ]),
    size: PropTypes.oneOf(["small", "medium", "large"])
};

export default FileGallery;
