import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import withStyles from "react-jss";
import { Switch, Route } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import {EmployeeRoutes} from "../../routes";

const styles = {};

function Main(props) {
    const { classes, location } = props;

    return (
        <Container fluid className={classes.main}>
            <Row>
                <Col xs={2} style={{ position: "fixed" }}>
                    <Sidebar />
                </Col>
                <Col className="mt-5 offset-2 pl-4">
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