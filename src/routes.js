// react routes, not to be convused with express routes
//
//<Route path="*" component={NotFound} />
import React from 'react';
import { Router, Route } from 'react-router';


import App from './components/App';
import NotFound from './components/NotFound';
import Public from './components/Public';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Public} />
        <Route path="app" component={App} />
        <Route path="*" component={NotFound} />
    </Router>
);

export default Routes;

