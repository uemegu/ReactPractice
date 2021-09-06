import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Top from "./Pages/Top";
import { ROUTER_PATH } from "./Const/Pages";
import ScreenSwitch from "./Controls/ScreenSwitch";
import BGM from "./Controls/BGM";
import Story from "./Controls/StoryReader";
import End from "./Pages/End";

const Contents = () => {
  return (
    <HashRouter>
      <ScreenSwitch>
        <BGM>
          <Story>
            <Switch>
              <Route exact path={ROUTER_PATH.TOP} component={Top} />
              <Route exact path={ROUTER_PATH.LOGIN} component={Login} />
              <Route exact path={ROUTER_PATH.END} component={End} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Story>
        </BGM>
      </ScreenSwitch>
    </HashRouter>
  );
};

function App() {
  return <Contents />;
}

export default App;
