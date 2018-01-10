import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {grey900, grey600, grey500, grey200} from 'material-ui/styles/colors';

const mainColor = grey900;
const hoverColor = grey600;
const mainColorAlt = grey500;
const hoverColorAlt = grey600;
const disabledColor = grey200;

class FaIconButton extends Component {

    constructor(props) {
        super(props);

        let altColor = this.props.alt === true;
        let disabled = this.props.disabled === true;
        this.colors = {
            main: disabled ? disabledColor
                        : !altColor ? mainColor : mainColorAlt,
            hover: disabled ? disabledColor
                        : !altColor ? hoverColor : hoverColorAlt
        };

        this.styles = this.props.style ? this.props.style : {};
        this.styles.cursor = "pointer";
        switch (this.props.size) {
            case "sm":
                this.styles.fontSize = "17px";
                break;
        }

        this.additionalClass = this.props.className ? " " + this.props.className : "";
    }

    render() {
        return (
                <FontIcon 
                    className={"fa fa-" + this.props.icon + this.additionalClass}
                    style={this.styles}
                    onClick={this.props.disabled ? null : this.props.onClick}
                    color={this.colors.main}
                    hoverColor={this.colors.hover} />
        );
    }
}

export default FaIconButton;