﻿import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Products from './components/Products';
import Orders from './components/Orders';

const App = ({ }) => {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
            <Route path='/products/:startIndex?' component={Products} />
            <Route path='/orders/:startIndex?' component={Orders} />
        </Layout>
    );
};

export default App;
