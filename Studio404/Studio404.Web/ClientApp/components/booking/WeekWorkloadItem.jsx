import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const styles = {
    component: {
        fontSize: "9px"
    },
    item: {
        padding: "2px",
        borderStyle: "none"
    },
    title: {
        fontWeight: "bold",
        lineHeight: "25px",
        display: "inline-block"
    }
};

export default class WeekWorkloadItem extends React.Component {
    render() {
        return (
            <div style={styles.component}>
                <span style={styles.title}>{this.props.data.title}</span>
                <ListGroup>
                    {this.props.data.labels.map((label) =>
                        <ListGroupItem key={label} style={styles.item}>{label}</ListGroupItem>    
                    )}
                </ListGroup>
            </div>
        );
    }
}