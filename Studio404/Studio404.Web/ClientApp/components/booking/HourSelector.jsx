import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Labels from "../../modules/Labels";

export default class HourSelector extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.selectionRenderer = this.selectionRenderer.bind(this);
        this.menuItems = this.menuItems.bind(this);
    }

    handleChange (event, index, values) {
        this.props.updateHours(values);
    }

    selectionRenderer (values) {
        switch (values.length) {
            case 0:
                return '';
            default:
                let first = this.props.dayHours.find(x => x.value === values[0]);
                return Labels.hoursSelector_valueText(first.title, values.length);
        }
    }

    menuItems(dayHours) {
        dayHours = dayHours ? dayHours : [];
        return dayHours.map((dayHour) => (
            <MenuItem
                key={dayHour.value}
                insetChildren={true}
                checked={this.props.hours && this.props.hours.indexOf(dayHour.value) > -1}
                value={dayHour.value}
                primaryText={dayHour.title}
                disabled={dayHour.disabled} />
        ));
    }

    render() {
        return (
            <SelectField
                multiple={true}
                value={this.props.hours}
                onChange={this.handleChange}
                selectionRenderer={this.selectionRenderer}
                disabled={this.props.disabled}
                floatingLabelText={Labels.hoursSelector_label}
                errorText={this.props.error}>
            
                {this.menuItems(this.props.dayHours)}
            </SelectField>
        );
    }
}