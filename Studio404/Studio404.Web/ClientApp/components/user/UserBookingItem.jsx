import React, { Component } from 'react'
import {
    TableRow,
    TableRowColumn
} from 'material-ui/Table'
import FaIconButton from '../common/FaIconButton'
import EnumService from '../../modules/EnumService'
import css from '../../styles/userProfile.css'

class UserBookingItem extends Component {
    render () {
        return (
            <TableRow>
                <TableRowColumn className={ css.bookingTableCell }>{this.props.date}</TableRowColumn>
                <TableRowColumn className={ css.bookingTableCell }>{this.props.time}</TableRowColumn>
                <TableRowColumn className={ css.bookingTableCell }>{this.props.cost}₽</TableRowColumn>
                <TableRowColumn className={ css.bookingTableCell }>{EnumService.bookingStatus(this.props.status)}</TableRowColumn>
                <TableRowColumn className={ css.bookingTableCell }>
                    <FaIconButton
                        icon="credit-card"
                        disabled={this.props.status !== 1}
                        onClick={() => this.props.pay(this.props.id)}
                        color={'clr_black'} />
                    <FaIconButton
                        icon="envelope-o"
                        disabled={this.props.status !== 2}
                        onClick={() => this.props.resend(this.props.id)}
                        className={ css.actionPadding }
                        color={'clr_black'} />
                    <FaIconButton
                        icon="times"
                        disabled={this.props.status === 3 || this.props.status === 2}
                        onClick={() => this.props.cancel(this.props.id)}
                        className={ css.actionCancel }
                        color={'clr_black'} />
                </TableRowColumn>
            </TableRow>
        )
    }
}

export default UserBookingItem
