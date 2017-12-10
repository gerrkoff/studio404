import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar as MuiToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {withRouter} from "react-router-dom";
import ToolbarLoginInfoContainer from "../../containers/ToolbarLoginInfoContainer";
import { ToolbarStyle, ToolbarBrandStyle } from "../../styles/Styles";
import Labels from "../../modules/Labels";

class Toolbar extends Component {
    render() {
        return (
            <div>
                <MuiToolbar style={ToolbarStyle}>
                    <ToolbarGroup>
                        <ToolbarTitle
                            text="404 studio"
                            style={ToolbarBrandStyle}
                            onClick={() => this.props.history.push("/")} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <RaisedButton label={Labels.booking} primary={true} onClick={() => this.props.history.push("/booking")} />
                        <ToolbarSeparator />
                        <div style={{width: "30px"}}/>
                        <ToolbarLoginInfoContainer />
                    </ToolbarGroup>
                </MuiToolbar>
            </div>
        );
    }
}

export default withRouter(Toolbar);