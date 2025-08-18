// src/routes/Routes.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";


const Support = React.lazy(() => import("../pages/main/support/Support"));

const SalesStepOne = React.lazy(() => import("../components/forms/sales/step-one/page"));
const SalesStepTwo = React.lazy(() => import("../components/forms/sales/step-two/page"));

const ClientStepOne = React.lazy(() => import("../components/forms/client/step-one/page"));
const ClientStepTwo = React.lazy(() => import("../components/forms/client/step-two/page"));

const ExpenseStepOne = React.lazy(() => import("../components/forms/expenses/step-one/page"));
const ExpenseStepTwo = React.lazy(() => import("../components/forms/expenses/step-two/page"));

const BookingStepOne = React.lazy(() => import("../components/forms/booking/step-one/page"));
const BookingStepTwo = React.lazy(() => import("../components/forms/booking/step-two/page"));

const RoomStepOne = React.lazy(() => import("../components/forms/room/step-one/page"));
const RoomStepTwo = React.lazy(() => import("../components/forms/room/step-two/page"));

const Welcome = React.lazy(() => import("../pages/authentication/welcome/page"));
const Signin = React.lazy(() => import("../pages/authentication/sign-in/page"));
const Signup = React.lazy(() => import("../pages/authentication/sign-up/step-one/page"));
const SignupContinue = React.lazy(() => import("../pages/authentication/sign-up/step-two/page"));
const UserDetails = React.lazy(() => import("../pages/main/user/details/UserDetails"));
const RecordDetails = React.lazy(() => import("../pages/main/home/details/record"));
const ExpensesDetails = React.lazy(() => import("../pages/main/home/details/expenses"));
const RoomDetails = React.lazy(() => import("../pages/main/room/details/RoomDetails"));
const BookingsDetails = React.lazy(() => import("../pages/main/bookings/details/BookingDetails"));
const Bookings = React.lazy(() => import("../pages/main/bookings/page"));
const Analytics = React.lazy(() => import("../pages/main/analytics/page"));
const Main = React.lazy(() => import("../pages/main/Main"));

const Routes: React.FC = () => {
  return (
    <IonRouterOutlet>
      <div>
        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>

        {/* PUBLIC ROUTES */}
        <PublicRoute path="/welcome" exact component={Welcome} />
        <PublicRoute path="/sign-in" exact component={Signin} />
        <PublicRoute path="/signup" exact component={Signup} />
        <PublicRoute path="/signup/steptwo" exact component={SignupContinue} />
        <Route path="/support" exact component={Support} />

        {/* PRIVATE ROUTES */}
        <PrivateRoute path="/bookings/:id" exact component={BookingsDetails} />
        <PrivateRoute path="/expenses/:id" exact component={ExpensesDetails} />
        <PrivateRoute path="/customer/:id" exact component={UserDetails} />
        <PrivateRoute path="/record/:id" exact component={RecordDetails} />
        <PrivateRoute path="/user/:id" exact component={UserDetails} />
        <PrivateRoute path="/room/:id" exact component={RoomDetails} />
        <PrivateRoute path="/sales/stepone" exact component={SalesStepOne} />
        <PrivateRoute path="/sales/steptwo" exact component={SalesStepTwo} />
        <PrivateRoute path="/register/customer/stepone" exact component={ClientStepOne} />
        <PrivateRoute path="/register/customer/steptwo" exact component={ClientStepTwo} />
        <PrivateRoute path="/register/expenses/stepone" exact component={ExpenseStepOne} />
        <PrivateRoute path="/register/expenses/steptwo" exact component={ExpenseStepTwo} />
        <PrivateRoute path="/register/booking/stepone" exact component={BookingStepOne} />
        <PrivateRoute path="/register/booking/steptwo" exact component={BookingStepTwo} />
        <PrivateRoute path="/register/room/stepone" exact component={RoomStepOne} />
        <PrivateRoute path="/register/room/steptwo" exact component={RoomStepTwo} />
        <PrivateRoute path="/bookings" exact component={Bookings} />
        <PrivateRoute path="/analytic" exact component={Analytics} />
        <PrivateRoute path="/home" exact component={Main} />
      </div>
    </IonRouterOutlet>
  );
};

export default Routes;
