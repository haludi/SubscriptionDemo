import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ startDateIndex, isLoading}) => {
  const prevStartDateIndex = (startDateIndex || 0) - 5;
  const nextStartDateIndex = (startDateIndex || 0) + 5;

    return (
        <p className='clearfix text-center'>
            <Link className='btn btn-default pull-left' to={`/fetchdata/${prevStartDateIndex}`}>Previous</Link>
            <Link className='btn btn-default pull-right' to={`/fetchdata/${nextStartDateIndex}`}>Next</Link>
            {isLoading ? <span>Loading...</span> : []}
        </p>
    );
};

export default Pagination;
