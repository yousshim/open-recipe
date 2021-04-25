import React from "react";
import { Switch, Route } from "react-router-dom";
import { Nav } from "./client/components/Nav";
import { HomePage } from "./client/pages/index";
import { LoginPage } from "./client/pages/login";
import { SignupPage } from "./client/pages/signup";

const routes = {
  "/": HomePage,
  "/login": LoginPage,
  "/signup": SignupPage,
};

export function App() {
  return (
    <>
    <Nav />
    <Switch>
      {Object.entries(routes).map(([path, Component]) => (
        <Route key={path} exact path={path}>
          <Component />
        </Route>
      ))}
    </Switch>
    </>
  );
}
