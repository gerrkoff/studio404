import React, { Component } from 'react';
import FaIconButton from "../common/FaIconButton";
import $ from "jQuery";

class PayAction extends Component {

    render() {
        const paymentDestination = `Rehearsal on ${this.props.date}, ${this.props.time}`;

        return (
            <div style={{ display: "inline-block" }}>
                <form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml" id={"payForm" + this.props.id}>
                    <input type="hidden" name="receiver" value={this.props.payAccId} />
                    <input type="hidden" name="quickpay-form" value="small" />
                    <input type="hidden" name="targets" value="Rehearsal payment" />
                    <input type="hidden" name="paymentType" value="AC" />
                    <input type="hidden" name="sum" value={this.props.cost} data-type="number" />
                    <input type="hidden" name="label" value={this.props.guid} />
                    <input type="hidden" name="formcomment " value={paymentDestination} />
                    <input type="hidden" name="short-dest" value={paymentDestination} />
                    <FaIconButton
                        size="sm"
                        icon="credit-card"                    
                        onClick={() => $("#payForm" + this.props.id).submit()}
                        disabled={this.props.disabled} />
                </form>
            </div>
        );
    }
}

export default PayAction;