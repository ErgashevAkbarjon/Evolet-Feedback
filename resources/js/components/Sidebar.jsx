import React, { useState, useEffect, useContext } from "react";
import withStyles from "react-jss";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import Loading from "../components/Loading";

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

function Sidebar({ classes, links }) {
    return (
        <Row>
            <div className={classes.sidebar}>
                <h1 className={classes.header}>Feedback</h1>
                <nav>
                    {links ? (
                        links.map((link, i) => (
                            <div key={i}>
                                <NavLink
                                    to={link.to}
                                    className={classes.sidebarLink}
                                    activeClassName={classes.sidebarLinkActive}
                                >
                                    {link.text}
                                </NavLink>
                            </div>
                        ))
                    ) : (
                        <Loading />
                    )}
                </nav>
            </div>
        </Row>
    );
}

export default withStyles(styles)(Sidebar);
