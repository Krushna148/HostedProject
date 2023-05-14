import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import UserLogin from "views/auth/UserLogin";
import UserSignUp from "views/auth/UserSignUp";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/user" render={(props) => <AdminLayout {...props} />} />
      <Route path="/login" render={(props) => <UserLogin {...props} />} exact={true}/>
      <Route path="/signup" render={(props) => <UserSignUp {...props} />} exact={true}/>
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);
