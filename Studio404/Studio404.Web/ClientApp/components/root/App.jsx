import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Toolbar from '../../components/toolbar/Toolbar'
import Message from '../../containers/MessageContainer'
import ConfirmDialog from '../../containers/ConfirmDialogContainer'
import css from '../../styles/app.css'

class App extends Component {
    render () {
        return (
            <div>
                <Toolbar />
                <Container>
                    <Row className={ css.main }>
                        <Col md="12">
                            {this.props.children}
                        </Col>
                    </Row>
                    <Message />
                    <ConfirmDialog />
                </Container>
            </div>
        )
    }
}

export default App
