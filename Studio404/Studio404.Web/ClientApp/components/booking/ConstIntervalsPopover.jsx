import React, { Component } from 'react'
import Popover from '../common/Popover'
import FaIconButton from '../common/FaIconButton'
import css from '../../styles/booking.css'

class ConstIntervalsPopover extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.open = this.open.bind(this)
        this.handleRequestClose = this.handleRequestClose.bind(this)
    }

    open(event) {
        // This prevents ghost click.
        event.preventDefault()
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }
    
    handleRequestClose() {
        this.setState({
            open: false
        })
    }
    
    render() {
        return (
            <span>
                <FaIconButton icon="question-circle" className={css.costHelp} onClick={this.open} color={'clr_secondary'} />
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} handleRequestClose={this.handleRequestClose}>
                    <ul className={css.costHelpList}>
                        {this.props.intervals.map(interval =>
                            <li key={interval}>{interval}</li>
                        )}
                    </ul>
                    </Popover>
            </span>
        );
    }
}

export default ConstIntervalsPopover;