import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';

class Home extends Component {

    constructor(props) {
        super(props);
        this.props.loadInfo();
    }

    render() {
        return (
            <div>
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
                <br/>
                <Row>
                    <Col md="12">
                        <Paper zDepth={2} style={styles.footer}>
                            {this.props.info.infoLoaded
                                ? <span>version: {this.props.info.version}</span>
                                : <span>...</span>
                            }
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}

const styles = {
    footer: {
        lineHeight: "25px",
        padding: "5px",
        fontSize: "12px"
    }
}

export default Home;