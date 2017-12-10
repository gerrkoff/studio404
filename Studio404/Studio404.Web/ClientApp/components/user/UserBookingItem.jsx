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
  import EnumService from "../../modules/EnumService";

class UserBookingItem extends Component {
    render() {
        return (
            <TableRow>
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.date}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.time}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{EnumService.bookingStatus(this.props.status)}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                    <FaIconButton
                        size="sm"
                        icon="credit-card"
                        disabled={this.props.status !== 1}
                        onClick={() => alert("Pay " + this.props.id)} />
                    <FaIconButton
                        icon="times"
                        disabled={this.props.status === 3 || this.props.status === 2}
                        onClick={() => this.props.cancel(this.props.id)}
                        style={{
                            paddingLeft: "15px",
                            fontSize: "19px"
                        }} />
                    <FaIconButton
                        size="sm"
                        icon="credit-card"
                        disabled={this.props.status !== 2}
                        onClick={() => this.props.resend(this.props.id)} 
                        style={{
                            paddingLeft: "15px"
                        }} />
                </TableRowColumn>
            </TableRow>
        );
    }
}

export default UserBookingItem;