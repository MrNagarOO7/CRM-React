import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";
import AdminHome from "./component/AdminHome/index";
import Home from "./component/Home/index";
import AdminDashboard from "./component/AdminDashboard/index";
import HrDashboard from "./component/HrDashboard/index";
import EmpDashboard from "./component/EmpDashboard/index";
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
                    <Route exact
                        path="/admin"
                        render={(props) => <AdminHome {...props} config={config} toast={toast}/>}
                    />
                    <Route
                        path="/admin/dashboard"
                        render={(props) => <AdminDashboard {...props} config={config} toast={toast}/>}
                    />
                    <Route
                        path="/hr/dashboard"
                        render={(props) => <HrDashboard {...props} config={config} toast={toast}/>}
                    />
                    <Route
                        path="/emp/dashboard"
                        render={(props) => <EmpDashboard {...props} config={config} toast={toast}/>}
                    />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;