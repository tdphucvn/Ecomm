import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';

const Authentication = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/authentication/login" component={Login}/>
                <Route exact path="/authentication/register" component={Register}/>
            </Switch>
        </Router>
    );
};

export default Authentication;
