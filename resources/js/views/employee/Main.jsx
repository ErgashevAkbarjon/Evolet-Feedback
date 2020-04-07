import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import withStyles from "react-jss";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import { EmployeeRoutes } from "../../routes";
import AuthContext from "../../components/AuthContext";
import { ApiRoutes } from "../../routes";
import ManualLink from "../../components/ManualLink";

const styles = {};

function Main({ classes }) {
    const [feedbackGroups, setFeedbackGroups] = useState(null);
    const [sidebarLinks, setSidebarLinks] = useState(null);

    const authContext = useContext(AuthContext);

    const getAuthName = () => {
        return authContext.getUser().full_name;
    };

    const onSignOut = () => {
        authContext.resetAuth();
    };

    const fetchFeedbackGroups = () => {
        axios
            .get(ApiRoutes.feedbackGroups)
            .then(({ data }) => setFeedbackGroups(data))
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        fetchFeedbackGroups();
    }, []);

    const updateSidebarLinks = () => {
        let links = [];

        const groupLinkPrefix = "/feedbacks/group/";

        links = feedbackGroups.map((g) => ({
            to: groupLinkPrefix + g.id,
            text: g.name,
        }));

        if (authContext.authIsAdmin()) {
            links = [
                ...links,
                {
                    to: "/settings",
                    text: "Настройки",
                },
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
                        <ManualLink />
                        <DropdownButton
                            title={getAuthName()}
                            className="d-inline"
                            variant="light"
                            alignRight
                        >
                            <Dropdown.Item onClick={onSignOut}>
                                Выйти
                            </Dropdown.Item>
                        </DropdownButton>
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
