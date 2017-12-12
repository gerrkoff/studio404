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
import PayAction from "../pay/PayAction";

class UserBookingItem extends Component {
    render() {
        return (
            <TableRow>
                <TableRowColumn style={{ textAlign: 'center' }}>{this.props.date}</TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>{this.props.time}</TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>{EnumService.bookingStatus(this.props.status)}</TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>
                    <PayAction
                        date={new Date()}
                        from={10}
                        to={11}
                        payAccId={410015855170459}
                        cost={50}
                        guid={11111}
                        disabled={this.props.status !== 1} />
                    <FaIconButton
                        size="sm"
                        icon="envelope-o"
                        disabled={this.props.status !== 2}
                        onClick={() => this.props.resend(this.props.id)} 
                        style={{
                            paddingLeft: "15px"
                        }} />
                    <FaIconButton
                        icon="times"
                        disabled={this.props.status === 3 || this.props.status === 2}
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