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
import EnumService from "../../modules/EnumService";
import LoaderContent from "../../components/common/LoaderContent";
import UserTitle from "../../components/user/UserTitle";
import ErrorLabel from "../common/ErrorLabel";

class UserBookings extends Component {

    constructor(props) {
        super(props);
        this.renderTable = this.renderTable.bind(this);
        this.renderLoader = this.renderLoader.bind(this);
        this.props.loadBookings();
    }

    render() {
        return (
            <div>
                <UserTitle title="My bookings"/>
                {this.props.isLoading === true
                    ? this.renderLoader()
                    : this.props.error === true
                        ? <ErrorLabel text="Error occured while loading data. Try to reload."/>
                        : this.renderTable()
                }
            </div>
        );
    }

    renderLoader() {
        return (
            <div style={{
                textAlign: "center",
                padding: "15px"
            }}>
                <LoaderContent />
            </div>
        );
    }

    renderTable() {
        return (
            <div>
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
                            {this.props.bookings.map(item =>
                                <UserBookingItem
                                    key={item.id}
                                    id={item.id}
                                    date={DateService.toDateString(item.date)}
                                    time={DateService.convertHourIntervalToLabel(item.from, item.to)}
                                    status={EnumService.bookingStatus(item.status)}
                                    reject={this.props.rejectBooking}/>
                            )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default UserBookings;