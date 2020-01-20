import React from "react";
import {Redirect, Route} from "react-router-dom";


export default function PrivateRoute({ component: Component, isAuthenticated, ...restProps }) {
  return (
    <Route {...restProps}
      render={props => (
        isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/accounts/login/', state: { from: props.location } }} />
      )} />
  );
}
