import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../utils/auth-utils/auth-service';



const Auth = new AuthService();


const PrivateRoute = ({ component: Component, user, ...rest }) => {

    const loggedIn = Auth.loggedIn();

    return (<Route
        {...rest}
        render={
            props => loggedIn ? (
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