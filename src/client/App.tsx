import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav";

import Home from "./pages/index";
import Login from "./pages/login";
import Signin from "./pages/signin";
import { User, userContext } from "./UserContext"
const routes = {
  "/": Home,
  "/login": Login,
  "/signup": Signin,
};

export function App() {
  const [user, setUser] = useState<User | null>(null)
  return (
    <userContext.Provider value={{user, setUser}}>
      <Nav />
      <Switch>
        {Object.entries(routes).map(([path, Component]) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}
      </Switch>
    </userContext.Provider>
  );
}
