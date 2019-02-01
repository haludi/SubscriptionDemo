import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ProductsStore from "../store/ProductsStore";
import * as OrdersStore from "../store/OrdersStore";
import ProductsTable from "./ProductsTable";
import ProductsPagination from "./ProductsPagination";

class Products extends Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.buyProduct = this.buyProduct.bind(this);
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
        this.props.getProducts(startIndex);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.startIndex === this.props.startIndex)
            return;
        // This method runs when incoming props (e.g., route params) change
        const startIndex = parseInt(nextProps.match.params.startIndex, 10) || 0;
        this.props.getProducts(startIndex);
    }

    buyProduct(id) {
        this.props.createOrder(id);
    }

    render() {
        return (
            <div>
                <h1>Products</h1>
                <ProductsTable buyProduct={this.buyProduct} {...this.props} />
                <ProductsPagination {...this.props} />
            </div>
        );
    }
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators({ ...ProductsStore.actionCreators, ...OrdersStore.actionCreators}, dispatch),
)(Products);
