import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Toolbar from "../../components/toolbar/Toolbar";
import Message from "../../containers/MessageContainer";
import ConfirmDialog from "../../containers/ConfirmDialogContainer";

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
                <Message />
                <ConfirmDialog />
            </Container>
        );
    }
}

export default App;