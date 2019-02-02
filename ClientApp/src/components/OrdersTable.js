import React from 'react';

const OrdersTable = ({ orders }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Products</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => {
                    return (
                        <tr key={order.id}>
                            <td>{order.dateTime}</td>
                            <td>{order.product.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default OrdersTable;
