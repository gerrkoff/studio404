import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';
import css from '../../styles/home.css';

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
                        <Paper className={ css.main } zDepth={1}>
                            <Row>
                                <Col md="12">
                                    <h4 className={ css.greeting }>Welcome to Studio 404!</h4>
                                </Col>
                            </Row>
                        </Paper>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md="12">
                        <Paper zDepth={1} className={ css.footer }>
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

export default Home;