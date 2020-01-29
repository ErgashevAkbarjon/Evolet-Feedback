import React from "react";
import withStyles from "react-jss";

const styles = {
    title: {
        color: "#707070",
        fontWeight: "400"
    }
};

function Title({ classes, title, children }) {
    return (
        <div>
            <div className="row">
                <div className="col">
                    <h2 className={classes.title}>{title}</h2>
                </div>
                <div className="col">
                    {children}
                </div>
            </div>
        </div>
    );
}
export default withStyles(styles)(Title);
