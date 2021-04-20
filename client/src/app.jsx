import { Redirect, Route, BrowserRouter, Switch } from "react-router-dom";
import React from "react";
import CategorySidebar from "./components/CategorySidebar";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/posts/" />
        </Route>
        <Route path="/posts/">
          <CategorySidebar />
        </Route>
        <Route path="/login/" />
        <Route path="/post/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
