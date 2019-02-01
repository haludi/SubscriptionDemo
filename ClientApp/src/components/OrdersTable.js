import React from 'react';

const OrdersTable = ({ Orders }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Buy</th>
                </tr>
            </thead>
            <tbody>
                {Orders.map(order => {
                    return (
                        <tr key={order.id}>
                            <td>{order.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default OrdersTable;
