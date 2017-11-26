import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from "../../components/root/Navigation";

class App extends Component {
    render() {
        return (
            <Container>
                <Navigation />
                {this.props.children}
            </Container>
        );
    }
}

export default App;