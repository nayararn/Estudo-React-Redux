import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/password/ForgotPassword";
import Register from "./pages/register/Register";
import Contact from "./pages/contact/Contact";
import Header from "./components/Header";
import Profile from "./pages/profile/Profile";
// import { Teste } from "./pages/teste/teste";

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default App;
