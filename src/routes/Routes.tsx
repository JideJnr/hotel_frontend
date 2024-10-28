// Routes.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Welcome from "../pages/welcome/Welcome";
import CreateInfo from "../pages/auth/onboarding/CreateInfo";
import ForgotPassword from "../pages/auth/onboarding/ForgotPassword";
import Login from "../pages/auth/sign-in/Login";
import RecoverPassword from "../pages/auth/onboarding/RecoverPassword";
import CreatePassword from "../pages/auth/onboarding/CreatePassword";
import CreateEmail from "../pages/auth/onboarding/CreateEmail";
import Landing from "../pages/landing/Landing";
import Analytics from "../pages/analytics/Analytics";

const Routes: React.FC = () => (
  <IonRouterOutlet>
    <Route path="/" exact={true}>
      <Redirect to="/welcome" />
    </Route>

    <Route path="/login" exact={true}>
      <Login />
    </Route>
    <Route path="/analytics" exact={true}>
      <Analytics />
    </Route>
    <Route path="/recover-password" exact={true}>
      <RecoverPassword />
    </Route>
    <Route path="/create-password" exact={true}>
      <CreatePassword />
    </Route>
    <Route path="/create-info" exact={true}>
      <CreateInfo />
    </Route>
    <Route path="/forgot-password" exact={true}>
      <ForgotPassword />
    </Route>
    <Route path="/welcome" exact={true}>
      <Welcome />
    </Route>
    <Route path="/sign-in" exact={true}>
      <Login />
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
