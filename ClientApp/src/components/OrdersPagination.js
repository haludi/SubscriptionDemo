import React from 'react';
import { Link } from 'react-router-dom';

const ProductsPagination = ({ startDateIndex, isLoading}) => {
  const prevStartDateIndex = (startDateIndex || 0) - 10;
  const nextStartDateIndex = (startDateIndex || 0) + 10;

    return (
        <p className='clearfix text-center'>
            <Link className='btn btn-default pull-left' to={`/products/${prevStartDateIndex}`}>Previous</Link>
            <Link className='btn btn-default pull-right' to={`/products/${nextStartDateIndex}`}>Next</Link>
            {isLoading ? <span>Loading...</span> : []}
        </p>
    );
};

export default ProductsPagination;
