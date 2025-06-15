// Routes.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Welcome from "../pages/authentication/welcome/page";
import Signin from "../pages/authentication/sign-in/page";
import Signup from "../pages/authentication/sign-up/step-one/page";
import SignupContinue from "../pages/authentication/sign-up/step-two/page";
import Staff from "../pages/main/staff/Main/page";
import SalesStepOne from "../pages/forms/sales/step-one/page";
import SalesStepTwo from "../pages/forms/sales/step-two/page";
import ClientStepOne from "../pages/forms/client/step-one/page";
import ExpensesStepOne from "../pages/forms/expenses/step-one/page";
import BookingStepOne from "../pages/forms/booking/step-one/page";
import CustomerStepTwo from "../pages/forms/client/step-two/page";


const Routes: React.FC = () => (
  <IonRouterOutlet>
    
    <Route path="/" exact={true}>
      <Redirect to="/welcome" />
    </Route>
    <Route path="/welcome" exact={true}>
      <Welcome />
    </Route>
    <Route path="/admin/dashboard" exact={true}>
      <Signup />
    </Route>
    <Route path="/staff/dashboard" exact={true}>
      <Staff />
    </Route>
    <Route path="/client/dashboard" exact={true}>
      <Signup />
    </Route>
    <Route path="/auth/account" exact={true}>
      <SignupContinue />
    </Route>
    <Route path="/auth/signup" exact={true}>
      <Signup />
    </Route>
    <Route path="/register/sales" exact={true}>
      <SalesStepOne />
    </Route>
    <Route path="/register/sales/steptwo" exact={true}>
      <SalesStepTwo />
    </Route>
    <Route path="/register/customer/steptwo" exact={true}>
      <CustomerStepTwo />
    </Route>
    
    <Route path="/register/expenses" exact={true}>
      <ExpensesStepOne />
    </Route>
    <Route path="/register/booking" exact={true}>
      <BookingStepOne />
    </Route>
    <Route path="/register/client" exact={true}>
      <ClientStepOne />
    </Route>
    <Route path="/sign-in" exact={true}>
      <Signin/>
    </Route>
  </IonRouterOutlet>
);

export default Routes;
