import React from "react";
import withStyles from "react-jss";
import { Link } from "react-router-dom";

const styles = {
    listWrapper: {
        maxHeight: "15rem",
        overflowY: "auto"
    },
    avatar: {
        height: "3rem",
        width: " 3rem",
        objectFit: " cover"
    }
};

function UserList({ classes, users, placeHolder }) {
    return (
        <div>
            {users.length ? (
                <div
                    className={
                        classes.listWrapper +
                        " list-group list-group-flush mb-3"
                    }
                >
                    {users.map((user, i) => (
                        <Link
                            to={user.link || ""}
                            className="list-group-item list-group-item-action"
                            key={i}
                        >
                            <div className="row align-items-center">
                                {user.hasOwnProperty("avatar") ? (
                                    <div className="p-0">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className={classes.avatar + " img-fluid rounded-circle"}
                                        />
                                    </div>
                                ) : null}
                                <div className="col">{user.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : placeHolder ? (
                <p className="text-secondary text-center">{placeHolder}</p>
            ) : null}
        </div>
    );
}
export default withStyles(styles)(UserList);
