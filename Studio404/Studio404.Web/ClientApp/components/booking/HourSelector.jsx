import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class HourSelector extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.selectionRenderer = this.selectionRenderer.bind(this);
        this.menuItems = this.menuItems.bind(this);
        this.validateHours = this.validateHours.bind(this);

        this.state = {values: [], valid: true};
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.date !== this.props.date)
            this.setState({values: []});
    }

    handleChange (event, index, values) {
        let valid = this.validateHours(values);
        this.props.updateHours(values, valid);
        this.setState({values: values, valid: valid});
    }

    validateHours(hours) {
        if(hours.length < 2) return true;
        hours.sortNumbers();
        return hours[hours.length-1] - hours[0] === hours.length - 1;
    }

    selectionRenderer (values) {
        switch (values.length) {
            case 0:
                return '';
            default:
                let first = this.props.dayHours.find(x => x.value === values[0]);
                return `${first.title}, ${values.length} hours`;
        }
    }

    menuItems(dayHours) {
        dayHours = dayHours ? dayHours : [];
        return dayHours.map((dayHour) => (
            <MenuItem
                key={dayHour.value}
                insetChildren={true}
                checked={this.state.values.indexOf(dayHour.hour) > -1}
                value={dayHour.value}
                primaryText={dayHour.title}
                disabled={dayHour.disabled} />
        ));
    }

    render() {
        return (
            <SelectField
                multiple={true}
                value={this.state.values}
                onChange={this.handleChange}
                selectionRenderer={this.selectionRenderer}
                disabled={!this.props.dayHours}
                floatingLabelText="Select hours"
                maxHeight={300} 
                errorText={!this.state.valid && 'Incorrect hours'}
                >
            
                {this.menuItems(this.props.dayHours)}
            </SelectField>
        );
    }
}