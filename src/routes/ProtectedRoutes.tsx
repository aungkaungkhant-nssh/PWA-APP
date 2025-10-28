import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ProtectedRouteProps } from '../interfaces/uiInterface';


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: Component,
    isAuthenticated,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
);

export default ProtectedRoute;
