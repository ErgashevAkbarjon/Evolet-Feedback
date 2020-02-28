import React from "react";
import withStyles from "react-jss";

const styles = {
    file: {
        width: "100%",
        borderRadius: "5px",
        cursor: "zoom-in"
    }
};

function File({ classes, file, size, onClick }) {
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
        <div className="col-8 col-md-6 col-lg-6 col-xl-4">
            <div className="row align-items-center">
                <div className={thumbnailCols + " mb-3"}>
                    <img
                        src={file.url}
                        alt={file.name}
                        className={classes.file}
                        onClick={() => onClick(file)}
                    />
                </div>
                <div className="col pl-0">
                    {file.name && file.name.length > 10
                        ? file.name.slice(0, 10) + "..."
                        : file.name}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(File);
