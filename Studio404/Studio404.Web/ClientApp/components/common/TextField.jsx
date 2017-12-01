import React, { Component } from 'react';
import MuiTextField from 'material-ui/TextField';

class TextField extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: ""};
    }
    
    handleChange(e) {
        let value = e.target.value;
        this.setState({value: value});
        this.props.updateValue(value);
    }

    render() {
        return (
            <MuiTextField
                hintText={this.props.hintText}
                floatingLabelText={this.props.floatingLabelText}
                type={this.props.type}
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
}

export default TextField;