import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const TOKEN_KEY = 'jwt';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
        localStorage.getItem(TOKEN_KEY)  ?
              <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};

export default PrivateRoute;