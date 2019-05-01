import React from 'react';
import {
    Container,
    Row,
    Col
} from "react-bootstrap";
import withStyles from 'react-jss';
import { Switch, Route} from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import routes from '../routes';

const styles = {

}

function Main(props) {
    const { classes } = props;
    return (
        <Container fluid className={classes.main}>
            <Row>
                <Col xs={2}>
                    <Sidebar />
                </Col>
                <Col>
                    <Switch>
                        {
                            routes.map((route, i) => (
                                <Route path={route.path} component={route.component}/>
                            ))
                        }
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

export default withStyles(styles)(Main);