import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";
import AdminHome from "./component/AdminHome/index";
import Home from "./component/Home/index";
import config from './config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const history = createBrowserHistory();
toast.configure();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                    <Route exact
                           path="/"
                           render={(props) => <Home {...props} config={config} toast={toast}/>}
                    />
                    <Route
                        path="/admin"
                        render={(props) => <AdminHome {...props} config={config} toast={toast}/>}
                    />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;