import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Col } from 'reactstrap';
import WeekWorkloadItem from "./WeekWorkloadItem";
import DateService from '../../modules/DateService';

const styles = {
    common: {
        minHeight: 125,
        width: 125,
        margin: 10,
        textAlign: 'center',
        display: 'inline-block'
    }
};

styles.enable = {
    ...styles.common,
    cursor: 'pointer'
}

styles.disable = {
    ...styles.common,
    color: 'gray'
}

class WeekWorkload extends Component {
    render() {
        return (
            <div>
                {this.props.workload.map((item =>
                    <Paper
                        style={DateService.dateLessToday(item.date)
                            ? styles.disable
                            : styles.enable   
                        }
                        zDepth={2}
                        onClick={() => {
                            if (!DateService.dateLessToday(item.date)) 
                                this.props.chooseDay(item.date)
                        }}
                        key={item.date}>
                        
                        <WeekWorkloadItem data={item} />
                    </Paper>
                ))}
            </div>
        );
    }
}

export default WeekWorkload;