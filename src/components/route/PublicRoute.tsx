// src/components/PublicRoute.tsx
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Redirect to="/home" /> : <Component {...props} />
    }
  />
);

export default PublicRoute;
