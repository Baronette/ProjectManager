import React from 'react';
import { useAuthorization } from './AuthorizationContext';
import { Route } from 'react-router-dom';
import Login from '../Pages/Login';

const PrivateRoute = ({ component, ...options }) => {
    const {user}  = useAuthorization();
    const finalComponent = !!user ? component : Login;
    return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;