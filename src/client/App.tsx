import React from "react"
import { Route, Switch } from 'react-router-dom'

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.globEager('./pages/*.jsx')

export function App() {
  return (
    <Switch>
      <Route exact path="/">
        <h1>HELLO WORLD</h1>
      </Route>
      <Route path="/uni">
        <h1>HELLO UNIVERSE</h1>
      </Route>
    </Switch>
  )
}