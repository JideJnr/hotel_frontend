// src/routes/Routes.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/loading/Loading";

const Welcome = React.lazy(() => import("../pages/authentication/welcome/page"));
const Signin = React.lazy(() => import("../pages/authentication/sign-in/page"));
const Signup = React.lazy(() => import("../pages/authentication/sign-up/step-one/page"));
const SignupContinue = React.lazy(() => import("../pages/authentication/sign-up/step-two/page"));
const StaffDashboard = React.lazy(() => import("../pages/main/staff/Main/page"));
const AdminDashboard = React.lazy(() => import("../pages/main/admin/Home/page"));
const UserDetails = React.lazy(() => import("../pages/main/user/details/UserDetails"));
const SalesStepOne = React.lazy(() => import("../components/forms/sales/step-one/page"));
const Room = React.lazy(() => import("../pages/main/room/Room"));

const ProtectedRoute: React.FC<{
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
  allowedRoles?: string[];
}> = ({ component: Component, allowedRoles, ...rest }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          !allowedRoles || allowedRoles.includes(user?.role?.toLowerCase()) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/unauthorized" />
          )
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

const Routes: React.FC = () => {
  return (
    <IonRouterOutlet>
      <div className="">
      <Route path="/" exact>
        <Redirect to="/welcome" />
      </Route>
      <Route path="/welcome" exact component={Welcome} />
      <Route path="/sign-in" exact component={Signin} />
      <Route path="/auth/signup" exact component={Signup} />
      <Route path="/auth/account" exact component={SignupContinue} />
      <Route path="/test" exact component={Room} />

      <ProtectedRoute
        path="/admin/dashboard"
        exact
        component={AdminDashboard}
        allowedRoles={['admin']}
      />
      <ProtectedRoute
        path="/staff/dashboard"
        exact
        component={StaffDashboard}
      //  allowedRoles={['staff', 'admin']}
      />


      
      <ProtectedRoute path="/user/:id" exact component={UserDetails} />
      <ProtectedRoute path="/register/sales" exact component={SalesStepOne} />
      
      <Route render={() => <Redirect to="/welcome" />} />
      </div>
    </IonRouterOutlet>
  );
};

export default Routes;