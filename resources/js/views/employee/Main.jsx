import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import withStyles from "react-jss";
import { Switch, Route } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { EmployeeRoutes } from "../../routes";
import AuthContext from '../../components/AuthContext';

const styles = {};

function Main(props) {
    const { classes, location } = props;
    
    const authContext = useContext(AuthContext);

    const onSignOut = () => {
        authContext.resetAuth();
    }

    return (
        <Container fluid className={classes.main}>
            <Row>
                <Col xs={2} style={{ position: "fixed" }}>
                    <Sidebar />
                </Col>
                <Col className="offset-2 pl-lg-4">
                    <div className="py-3 text-right">
                        <button type="button" className="btn btn-link" onClick={onSignOut}>
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
