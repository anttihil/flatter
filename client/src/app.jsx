import { Route, BrowserRouter, Switch } from "react-router-dom";
import React from "react";
import Homepage from "./routes/homepage";
import ReadPost from "./routes/readPost";
import LoginPage from "./routes/loginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/post">
          <ReadPost />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
