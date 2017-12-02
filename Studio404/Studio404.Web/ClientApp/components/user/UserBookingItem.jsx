import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  import FaIconButton from "../common/FaIconButton";

class UserBookingItem extends Component {
    render() {
        return (
            <TableRow>
                <TableRowColumn>{this.props.date}</TableRowColumn>
                <TableRowColumn>{this.props.time}</TableRowColumn>
                <TableRowColumn>{this.props.status}</TableRowColumn>
                <TableRowColumn><FaIconButton icon="credit-card" size="sm"/></TableRowColumn>
            </TableRow>
        );
    }
}

export default UserBookingItem;