import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, user, loggedIn, ...rest }) => (

    <Route
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
    />
);

export default PrivateRoute;