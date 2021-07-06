import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';

const Authentication = () => {
    return (
        <Switch>
            <Route exact path="/authentication/login" component={Login}/>
            <Route exact path="/authentication/register" component={Register}/>
        </Switch>
    );
};

export default Authentication;
