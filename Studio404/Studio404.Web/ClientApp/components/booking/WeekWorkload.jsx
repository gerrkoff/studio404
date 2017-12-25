import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Col } from 'reactstrap';
import WeekWorkloadItem from "./WeekWorkloadItem";

const style = {
    minHeight: 100,
    width: 100,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer'
};

class WeekWorkload extends Component {
    render() {
        return (
            <div>
                {this.props.workload.map((item =>
                    <Paper style={style} zDepth={2} onClick={() => this.props.chooseDay(item.date)} key={item.date}>
                        <WeekWorkloadItem data={item} />
                    </Paper>
                ))}
            </div>
        );
    }
}

export default WeekWorkload;