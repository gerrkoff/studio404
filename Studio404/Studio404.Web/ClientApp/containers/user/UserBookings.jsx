import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import UserBookingItem from "../../components/user/UserBookingItem";
import DateService from "../../modules/DateService";
import UserService from "../../modules/UserService";
import EnumService from "../../modules/EnumService";
import Loader from "../../components/common/Loader";

class UserBookings extends Component {

    constructor(props) {
        super(props);
        this.renderTable = this.renderTable.bind(this);
        this.loadBookings = this.loadBookings.bind(this);

        this.state = {bookings: null};
        this.loadBookings();
    }

    loadBookings() {
        UserService.GetUserBookings()
            .done(data => this.setState({bookings: data}));
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                {this.state.bookings
                    ? this.renderTable()
                    : <Loader />
                }
            </div>
        );
    }

    renderTable() {
        return (
            <Table>
                <TableHeader
                    height="50px"
                    displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Time</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                </TableHeader>
                <TableBody
                    showRowHover={true}>
                        {this.state.bookings.map(item =>
                            <UserBookingItem
                                key={item.id}
                                date={DateService.toDateString(item.date)}
                                time={DateService.convertHourIntervalToLabel(item.from, item.to)}
                                status={EnumService.bookingStatus(item.status)}/>
                        )}
                </TableBody>
            </Table>
        );
    }
}

export default UserBookings;