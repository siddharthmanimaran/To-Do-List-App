import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Header from "./Header";
import MainPage from "../Pages/MainPage";
import LogInPage from "../Pages/LogInPage";
import SignUpPage from "../Pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={LogInPage} exact />
          <Route path="/MainPage" component={MainPage} />
          <Route path="/SignUp" component={SignUpPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
