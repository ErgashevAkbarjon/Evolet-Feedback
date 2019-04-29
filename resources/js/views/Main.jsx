import React from 'react';
import { 
    Dropdown,
    Container,
    Row,
    Col
 } from "react-bootstrap";
import withStyles from 'react-jss';

const styles = {
    main:{
        fontSize: '22px',
        fontFamily: 'Segoe UI'
    },
    sidebar: {
        background: "#253338",
        minHeight: "100vh",
        color: 'white',
        fontSize: '1.25rem'
    },
    
}

function Main(props) {
    const {classes} = props;
    return (
        <Container fluid className={classes.main}>
            <Row>
                <Col xs={1} className={classes.sidebar}>
                    <h1>Feedback</h1>
                    
                    <nav>Упаковки</nav>
                    <nav>Упаковки</nav>
                    <nav>Упаковки</nav>
                </Col>
                <Col>

                </Col>         
            </Row>
        </Container>
    );
}

export default withStyles(styles)(Main);