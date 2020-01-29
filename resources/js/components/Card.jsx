import React from "react";
import withStyles from "react-jss";

const styles = {
    card: {
        border: "1px solid #cccccc",
        borderRadius: "5px",
        overflow: "hidden"
    },
    withBMargin: {
        marginBottom: "2rem"
    },
    title: {
        background: "#F5F5F5",
        color: "#707070",
        padding: ".8rem 1rem",
        borderBottom: "1px solid #cccccc"
    },
    content: {
        padding: "1rem",
        wordBreak: 'break-all'
    }
};

function Card({
    classes,
    title,
    info,
    showInfo,
    children,
    className,
    noMargin
}) {
    return (
        <div className={className}>
            <div
                className={
                    classes.card + (noMargin ? "" : ` ${classes.withBMargin}`)
                }
            >
                <div className={classes.title}>{title}</div>
                <div className={classes.content}>
                    {showInfo ? (
                        <div
                            className="col text-center"
                            style={{ color: "#707070a8" }}
                        >
                            {info}
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(Card);
