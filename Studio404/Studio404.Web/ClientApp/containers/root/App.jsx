import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from "../../components/root/Navigation";
import LoginInfo from "../login/LoginInfo";
import Toolbar from "../../components/root/Toolbar";

class App extends Component {
    render() {
        return (
            <Container>
                <Toolbar />
                <LoginInfo />
                {this.props.children}
            </Container>
        );
    }
}

export default App;