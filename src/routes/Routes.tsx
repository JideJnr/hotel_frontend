// Routes.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Welcome from "../pages/welcome/Welcome";
import CreatePassword from "../pages/auth/onboarding/CreatePassword";
import CreateEmail from "../pages/auth/onboarding/CreateEmail";
import Landing from "../pages/home/landing/Landing";
import Analytics from "../pages/analytics/Analytics";
import Support from "../pages/support/Support";
import SignIn from "../pages/auth/signin/signin";
import SignUp from "../pages/auth/signup/signup";
import Funding from "../pages/funding/Funding";

const Routes: React.FC = () => (
  <IonRouterOutlet>
    <Route path="/" exact={true}>
      <Redirect to="/welcome" />
    </Route>
    <Route path="/support" exact={true}>
      <Support />
    </Route>

    <Route path="/analytics" exact={true}>
      <Analytics />
    </Route>
    <Route path="/welcome" exact={true}>
      <Welcome />
    </Route>
    <Route path="/signin" exact={true}>
      <SignIn />
    </Route>
    <Route path="/funding" exact={true}>
      <Funding />
    </Route>

    <Route path="/home" exact={true}>
      <Landing />
    </Route>
    <Route path="/password" exact={true}>
      <CreatePassword />
    </Route>
    <Route path="/create-email" exact={true}>
      <CreateEmail />
    </Route>
  </IonRouterOutlet>
);

export default Routes;
