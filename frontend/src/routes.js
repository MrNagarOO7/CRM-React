import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";
import AdminHome from "./component/AdminHome/index";
import Home from "./component/Home/index";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                    <Route exact  path="/" component={Home} />
                    <Route path="/admin" component={AdminHome} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;