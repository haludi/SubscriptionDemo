import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { HubConnection, TransportType, ConsoleLogger, LogLevel } from "signalr";
import { connect } from "react-redux";
import * as OrdersStore from "../store/OrdersStore";
import OrdersTable from "./OrdersTable";
import OrdersPagination from "./OrdersPagination";

class Orders extends Component {
    constructor() {
        var transport = TransportType.WebSockets;
        let logger = new ConsoleLogger(LogLevel.Information);

        // create Connection
        this._connection = new HubConnection(`http://${document.location.host}/admin`,
            { transport: transport, logging: logger });

        // start connection
        this._connection.start().catch(err => console.error(err, 'red'));
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
        this.props.getOrders(startIndex);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.startIndex === this.props.startIndex)
            return;
        // This method runs when incoming props (e.g., route params) change
        const startIndex = parseInt(nextProps.match.params.startIndex, 10) || 0;
        this.props.getOrders(startIndex);
    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                <OrdersTable buyOrder={this.buyOrder} {...this.props} />
                <OrdersPagination {...this.props} />
            </div>
        );
    }
}

export default connect(
    state => state.Orders,
    dispatch => bindActionCreators({ ...OrdersStore.actionCreators, ...OrdersStore.actionCreators}, dispatch),
)(Orders);
