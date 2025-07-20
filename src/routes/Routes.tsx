// src/routes/Routes.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";


const Welcome = React.lazy(() => import("../pages/authentication/welcome/page"));
const Signin = React.lazy(() => import("../pages/authentication/sign-in/page"));
const Signup = React.lazy(() => import("../pages/authentication/sign-up/step-one/page"));
const SignupContinue = React.lazy(() => import("../pages/authentication/sign-up/step-two/page"));
const UserDetails = React.lazy(() => import("../pages/main/user/details/UserDetails"));
const SalesStepOne = React.lazy(() => import("../components/forms/sales/step-one/page"));
const Room = React.lazy(() => import("../pages/main/room/Room"));
const Main = React.lazy(() => import("../pages/main/Main"));


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
      <Route path="/user/:id" exact component={UserDetails} />
      <Route path="/register/sales" exact component={SalesStepOne} />
      <Route path="/home" exact component={Main} />

      </div>
    </IonRouterOutlet>
  );
};

export default Routes;