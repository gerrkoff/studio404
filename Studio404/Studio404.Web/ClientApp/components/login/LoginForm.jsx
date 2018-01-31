import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Labels from "../../modules/Labels";

class LoginForm extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col md="8">
                        <TextField
                            hintText={Labels.loginForm_userEnter}
                            floatingLabelText={Labels.loginForm_user}
                            value={this.props.loginInfo.username}
                            onChange={(e) => this.props.updateLoginInfo("username", e.target.value)}
                            errorText={this.props.loginInfo.usernameError} />
                        <br />
                        <TextField
                            hintText={Labels.loginForm_passEnter}
                            floatingLabelText={Labels.loginForm_pass}
                            type="password"
                            value={this.props.loginInfo.password}
                            onChange={(e) => this.props.updateLoginInfo("password", e.target.value)}
                            errorText={this.props.loginInfo.passwordError} />
                    </Col>
                    <Col md="4">
                        <br /><FlatButton label="VKontakte" secondary={true} onClick={() => this.props.externalLogin("VKontakte")} />
                        <br /><FlatButton label="Facebook" secondary={true} onClick={() => this.props.externalLogin("Facebook")} />
                        <br /><FlatButton label="Twitter" secondary={true} onClick={() => this.props.externalLogin("Twitter")} />
                        <br /><FlatButton label="Yandex" secondary={true} onClick={() => this.props.externalLogin("Yandex")} />
                        <br /><FlatButton label="Google" secondary={true} onClick={() => this.props.externalLogin("Google")} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LoginForm;