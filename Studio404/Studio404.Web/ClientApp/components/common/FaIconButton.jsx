import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {grey900, grey600, grey500} from 'material-ui/styles/colors';

const mainColor = grey900;
const hoverColor = grey600;
const mainColorAlt = grey500;
const hoverColorAlt = grey600;

class FaIconButton extends Component {

    constructor(props) {
        super(props);

        let altColor = this.props.alt === true;
        this.colors = {
            main: !altColor ? mainColor : mainColorAlt,
            hover: !altColor ? hoverColor : hoverColorAlt
        }

        this.styles = this.props.style ? this.props.style : {};
        this.styles.cursor = "pointer";
        switch (this.props.size) {
            case "sm":
                this.styles.fontSize = "17px";
                break;
        }
    }

    render() {
        return (
                <FontIcon 
                    className={"fa fa-" + this.props.icon}
                    style={this.styles}
                    onClick={this.props.onClick}
                    color={this.colors.main}
                    hoverColor={this.colors.hover} />
        );
    }
}

export default FaIconButton;