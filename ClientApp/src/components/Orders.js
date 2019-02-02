import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { HubConnectionBuilder} from "@aspnet/signalr";
import { connect } from "react-redux";
import * as OrdersStore from "../store/OrdersStore";
import OrdersTable from "./OrdersTable";
import OrdersPagination from "./OrdersPagination";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();

        // create Connection
        this._connection = new HubConnectionBuilder()
            .withUrl("/hub")
            .build();

        this._connection.start().catch(err => document.write(err));

        this._connection.on("OrderAdded", (message) => {
            this.notificationDOMRef.current.addNotification({
                title: "New Order :-)",
                message: message,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: { duration: 2000 },
                dismissable: { click: true }
            });
//            alert(`New order: ${message}`);
        });
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
                <ReactNotification ref={this.notificationDOMRef} />
                <h1>Orders</h1>
                <OrdersTable {...this.props} />
                <OrdersPagination {...this.props} />
            </div>
        );
    }
}

export default connect(
    state => state.orders,
    dispatch => bindActionCreators(OrdersStore.actionCreators, dispatch),
)(Orders);
