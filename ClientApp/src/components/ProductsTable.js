import React from 'react';

const ProductsTable = ({ products, buyProduct  }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Buy</th>
                </tr>
            </thead>
            <tbody>
                {products.map(order => {
                    return (
                        <tr key={order.id}>
                            <td>{order.name}</td>
                            <td><a className='btn btn-default pull-left' onClick={() => buyProduct(order.id)}>+</a></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ProductsTable;
