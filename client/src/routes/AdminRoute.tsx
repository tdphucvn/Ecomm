import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AdminRoute = (props: any) => {
    const {component: Component, ...rest} = props;
    const { admin } = useSelector((state: RootState) => state.auth);

    return (
        <Route {...rest} render={() => (admin ? <Component /> : <Redirect to="/authentication/login" />)}/>
    )
};

export default AdminRoute;
