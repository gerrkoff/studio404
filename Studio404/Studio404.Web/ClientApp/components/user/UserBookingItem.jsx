import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  import IconButton from 'material-ui/IconButton';
  import ActionHome from 'material-ui/svg-icons/action/home';  

class UserBookingItem extends Component {
    render() {
        return (
            <TableRow>
                <TableRowColumn>{this.props.date}</TableRowColumn>
                <TableRowColumn>{this.props.time}</TableRowColumn>
                <TableRowColumn>{this.props.status}</TableRowColumn>
                <TableRowColumn><IconButton><ActionHome/></IconButton></TableRowColumn>
            </TableRow>
        );
    }
}

export default UserBookingItem;