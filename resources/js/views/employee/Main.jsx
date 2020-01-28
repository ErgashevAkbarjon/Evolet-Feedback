import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import withStyles from "react-jss";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import { EmployeeRoutes } from "../../routes";
import AuthContext from "../../components/AuthContext";
import { ApiRoutes } from "../../routes";

const styles = {};

function Main({ classes }) {
    const [feedbackGroups, setFeedbackGroups] = useState(null);
    const [sidebarLinks, setSidebarLinks] = useState(null);

    const authContext = useContext(AuthContext);

    const onSignOut = () => {
        authContext.resetAuth();
    };

    const fetchFeedbackGroups = () => {
        const authUser = authContext.getUser();
        const employeeByUserURL =
            ApiRoutes.employees + "?user_id=" + authUser.id;

        axios
            .get(employeeByUserURL)
            .then(({ data: employees }) => {
                console.log();
                setFeedbackGroups(employees[0].groups);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        fetchFeedbackGroups();
    }, []);

    const updateSidebarLinks = () => {
        let links = [];

        const groupLinkPrefix = "/feedbacks/group/";

        links = feedbackGroups.map(g => ({
            to: groupLinkPrefix + g.id,
            text: g.name
        }));

        if (authContext.authIsAdmin()) {
            links = [
                ...links,
                {
                    to: "/settings",
                    text: "Настройки"
                }
            ];
        }

        setSidebarLinks(links);
    };

    useEffect(() => {
        if (!feedbackGroups) return;
        updateSidebarLinks();
    }, [feedbackGroups]);

    return (
        <Container fluid className={classes.main}>
            <Row>
                <Col xs={2} style={{ position: "fixed" }}>
                    <Sidebar links={sidebarLinks} />
                </Col>
                <Col className="offset-2 pl-lg-4">
                    <div className="py-3 text-right">
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={onSignOut}
                        >
                            Выйти
                        </button>
                    </div>
                    <Switch>
                        {EmployeeRoutes.map((routeProps, i) => (
                            <Route key={i} {...routeProps} />
                        ))}
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

export default withStyles(styles)(Main);
