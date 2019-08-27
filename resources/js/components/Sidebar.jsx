import React, { useState, useEffect, useContext } from "react";
import withStyles from "react-jss";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { SidebarGroups } from "../routes";
import { NavLink } from "react-router-dom";

const styles = {
    sidebar: {
        background: "#253338",
        minHeight: "100vh",
        width: "100%",
        color: "white",
        fontSize: "1.3rem"
    },
    sidebarLink: {
        paddingLeft: "24px",
        color: "white",
        width: "100%",
        margin: "6px 0px",
        display: "inherit",
        "&:hover": {
            color: "white",
            textDecoration: "none"
        }
    },
    sidebarLinkActive: {
        background: "#f3f3f340"
    },
    header: {
        fontSize: "2rem",
        padding: "24px",
        fontWeight: "400"
    }
};

function Sidebar({ classes }) {
    const [groups, setGroups] = useState();

    useEffect(() => {
        axios
            .get(SidebarGroups.path)
            .then(({ data }) => setGroups(data))
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <Row>
            <div className={classes.sidebar}>
                <h1 className={classes.header}>Feedback</h1>

                <nav>
                    {groups ? (
                        groups.map((group, i) => (
                            <div key={i}>
                                <NavLink
                                    to={"/feedbacks/group/" + group.id}
                                    className={classes.sidebarLink}
                                    activeClassName={classes.sidebarLinkActive}
                                >
                                    {group.name}
                                </NavLink>
                            </div>
                        ))
                    ) : (
                        <p>Загрузка...</p>
                    )}
                </nav>
            </div>
        </Row>
    );
}

export default withStyles(styles)(Sidebar);
