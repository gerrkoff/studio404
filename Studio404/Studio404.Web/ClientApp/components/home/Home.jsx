import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Paper from 'material-ui/Paper';
import css from '../../styles/home.css';
import { muiTheme } from '../../modules/MaterialTheme';

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
                                    <h4 className={ css.greeting } style={{color: muiTheme.palette.primary2Color}}>Welcome to Studio 404!</h4>
                                </Col>
                            </Row>
                        </Paper>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md="4">
                        <Paper className={ css.map } zDepth={1}>
                            <Row>
                                <Col md="12">
                                    <h4 className={ css.greeting } style={{color: muiTheme.palette.primary2Color}}>Address</h4>
                                </Col>
                            </Row>
                        </Paper>
                    </Col>
                    <Col md="8">
                        <Paper className={ css.map } zDepth={1}>
                            <Row>
                                <Col md="12">
                                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af4f7411f8e61f974863e86465b174241d4f4cbe9e07d8af8c1204659987f37d0&amp;source=constructor" width="100%" height="250px" frameBorder="0"></iframe>
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