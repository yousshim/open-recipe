import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav";

import Home from "./pages/index";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { UserProvider } from "./UserContext";
const routes = {
  "/": Home,
  "/login": Login,
  "/signup": Signup,
};

export function App() {
  return (
    <UserProvider>
      <Nav />
      <Switch>
        {Object.entries(routes).map(([path, Component]) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}
      </Switch>
    </UserProvider>
  );
}
