import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import Labels from '../../modules/Labels'
import css from '../../styles/booking.css'

class BookingHelp extends Component {
    render () {
        return (
            <div>
                {this.props.showHelp
                    ? (
                        <Paper zDepth={1}>
                            <Row>
                                <Col md="12">
                                    <p className={ css.helpText }>
                                        {Labels.booking_help}
                                    </p>
                                </Col>
                                <Col md="12" className={ css.rightAligned }>
                                    <FlatButton label={Labels.close} secondary={true} onClick={() => this.props.toggleHelp(false)} />
                                </Col>
                            </Row>
                        </Paper>
                    )
                    : (
                        <div className={ css.rightAligned }>
                            <FlatButton
                                label={Labels.booking_helpShow}
                                secondary={true}
                                onClick={() => this.props.toggleHelp(true)}
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}

export default BookingHelp
