// Routes.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Welcome from "../pages/welcome/Welcome";
import CreatePassword from "../pages/auth/onboarding/CreatePassword";
import CreateEmail from "../pages/auth/onboarding/CreateEmail";
import Analytics from "../pages/analytics/Analytics";
import Support from "../pages/support/Support";
import SignIn from "../pages/auth/signin/signin";
import Funding from "../pages/funding/Funding";
import Start from "../pages/home/start/Home";
import Complete from "../pages/auth/signup/Complete";

const Routes: React.FC = () => (
  <IonRouterOutlet>
    <Route path="/" exact={true}>
      <Redirect to="/welcome" />
    </Route>
    <Route path="/main/home" exact={true}>
      <Redirect to="/main" />
    </Route>
    <Route path="/main/room" exact={true}>
      <Redirect to="/main" />
    </Route>
    <Route path="/main/user" exact={true}>
      <Redirect to="/main" />
    </Route>
    <Route path="/main/activity" exact={true}>
      <Redirect to="/main" />
    </Route>
    <Route path="/main/settings" exact={true}>
      <Redirect to="/main" />
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
    <Route path="/signupcomplete" exact={true}>
      <Complete  />
    </Route>
    <Route path="/main" exact={true}>
      <Start  />
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
