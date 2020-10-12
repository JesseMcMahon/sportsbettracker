import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-routes/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/Profile/Profile";

//check for token to keep user logged in
if (localStorage.jwtToken) {
  //Set Auth token header auth.
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //decode token and get user info/expiration
  const decoded = jwt_decode(token);
  //Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  //check to see if token expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/picks/:profile" component={Profile} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
