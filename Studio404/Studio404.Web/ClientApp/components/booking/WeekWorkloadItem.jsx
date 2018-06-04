import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import css from '../../styles/booking.css'

export default class WeekWorkloadItem extends React.Component {
    render () {
        return (
            <div className={css.weekWorkloadContainer}>
                <span className={css.weekWorkloadTitle}>{this.props.data.title}</span>
                <ListGroup>
                    {this.props.data.labels.map((label) =>
                        <ListGroupItem key={label} className={css.weekWorkloadItem}>{label}</ListGroupItem>
                    )}
                </ListGroup>
            </div>
        )
    }
}
