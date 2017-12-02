import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from "../../components/root/Navigation";
import Toolbar from "../../components/toolbar/Toolbar";

class App extends Component {
    render() {
        return (
            <Container>
                <Toolbar />
                <Row style={{marginTop: "10px"}}>
                    <Col md="12">
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;