import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import WeekWorkloadItem from './WeekWorkloadItem'
import DateService from '../../modules/DateService'
import css from '../../styles/booking.css'

class WeekWorkload extends Component {
    render () {
        return (
            <div>
                {this.props.workload.map(item =>
                    <Paper
                        className={DateService.dateLessToday(item.date)
                            ? css.weekWorkloadPageDisabled
                            : css.weekWorkloadPageEnabled
                        }
                        zDepth={1}
                        onClick={() => {
                            if (!DateService.dateLessToday(item.date)) {
                                this.props.chooseDay(item.date)
                            }
                        }}
                        key={item.date}>

                        <WeekWorkloadItem data={item} />
                    </Paper>
                )}
            </div>
        )
    }
}

export default WeekWorkload
