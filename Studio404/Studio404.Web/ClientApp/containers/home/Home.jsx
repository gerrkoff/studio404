import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';

class Home extends Component {
    render() {
        return (
            <Row>
                <Col md="12">
                    <Paper style={{marginTop: 8, height: 300}} zDepth={2}>
                        <Row>
                            <Col md="12">
                                <h4 style={{padding: 10}}>Welcome to 404 studio!</h4>
                            </Col>
                        </Row>
                    </Paper>
                </Col>
            </Row>
        );
    }
}

export default Home;