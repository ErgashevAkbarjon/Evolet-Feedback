import React from "react";
import withStyles from "react-jss";

const styles = {
    fileViewer: {
        position: "fixed",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: '999999',
        "& img": {
            maxWidth: "55%",
            cursor: 'zoom-out'
        }
    }
};

function FileViewer({ classes, file, onHide }) {
    return (
        <div
            className={
                classes.fileViewer +
                " d-flex justify-content-center align-items-center"
            }
            onClick={onHide}
        >
            <img
                src={file}
                onClick={onHide}
                className="img-fluid img-thumbnail"
            />
        </div>
    );
}

export default withStyles(styles)(FileViewer);
