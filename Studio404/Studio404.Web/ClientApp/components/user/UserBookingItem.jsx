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
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.time}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.status}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                    <FaIconButton
                        size="sm"
                        icon="credit-card" />
                    <FaIconButton
                        icon="times"
                        onClick={() => this.props.cancel(this.props.id)}
                        style={{
                            paddingLeft: "15px",
                            fontSize: "19px"
                        }} />
                </TableRowColumn>
            </TableRow>
        );
    }
}

export default UserBookingItem;