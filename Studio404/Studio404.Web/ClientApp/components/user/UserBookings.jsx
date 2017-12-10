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
import LoaderContent from "../../components/common/LoaderContent";
import UserTitle from "../../components/user/UserTitle";
import ErrorLabel from "../common/ErrorLabel";
import Labels from "../../modules/Labels";

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
                <UserTitle title={Labels.userBookings_title} />
                {this.props.isLoading === true
                    ? this.renderLoader()
                    : this.props.error === true
                        ? <ErrorLabel text={Labels.errorLoadCommon}/>
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
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        
                        <TableRow>
                            <TableHeaderColumn style={{textAlign: 'center'}}>{Labels.userBookings_date}</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: 'center'}}>{Labels.userBookings_time}</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: 'center'}}>{Labels.userBookings_status}</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: 'center'}}>{Labels.userBookings_actions}</TableHeaderColumn>
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
                                    status={item.status}
                                    cancel={this.props.cancelBooking}
                                    resend={this.props.resendBookingCode}/>
                            )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default UserBookings;