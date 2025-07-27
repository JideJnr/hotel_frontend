// src/components/PrivateRoute.tsx
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/sign-in" />
    }
  />
);

export default PrivateRoute;
