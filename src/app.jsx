import React from "react";
import { Route, Switch } from "react-router";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/ligin";
import Main from "./layouts/main";
import Users from "./layouts/users";
import User from "./components/page/userPage/userPage";
import EditPage from "./components/page/userPage/editPage";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId/edit" component={EditPage} />
        <Route path="/users/:userId" component={User} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  );
};

export default App;
