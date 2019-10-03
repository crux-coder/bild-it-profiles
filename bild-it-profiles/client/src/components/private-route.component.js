import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../utils/auth-service';
import ROLES from '../constants/roles';



const Auth = new AuthService();


const PrivateRoute = ({ component: Component, user, roles, ...rest }) => {

    const loggedIn = Auth.loggedIn();


    return (<Route
        {...rest}
        render={
            props => Auth.loggedIn() && Auth.hasRoles(...roles = [ROLES.USER]) ? (
                <Component
                    {...rest}
                    user={user || {}}
                    loggedIn={loggedIn}
                    {...props} />)
                : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        }
    />)
};

export default PrivateRoute;