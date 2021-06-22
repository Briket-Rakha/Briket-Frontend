/* eslint-disable max-len */
// Import module
import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { LastLocationProvider } from 'react-router-last-location';

// Import Route List
import Routes from './RouteList';

// Import Private Route
import PrivateRoute from './PrivateRoute';

// Import Views
const Login = lazy(() => import('../views/Auth/Login'));
const Register = lazy(() => import('../views/Auth/Register'));
const ProductionModel = lazy(() => import('../views/ProductionModel'));
const RawMaterial = lazy(() => import('../views/ProductionModel/Input/SelfProduce/RawMaterial'));
// Create Browser History
const browserHistory = createBrowserHistory();

const MyRouter = () => {
  return (
    <Router history={browserHistory}>
      <LastLocationProvider watchOnlyPathname>
        <Switch>
          <PrivateRoute
            path={Routes.production.dashboard}
            component={ProductionModel}
            exact
          />
          <PrivateRoute
            path={Routes.production.input.selfProduce.rawMaterial}
            component={RawMaterial}
            exact
          />
          <PrivateRoute
            path={Routes.production.payment}
            component={ProductionModel}
            exact
          />
          <Route path={Routes.login.root} component={Login} exact />
          <Route path={Routes.register.root} component={Register} exact />
        </Switch>
      </LastLocationProvider>
    </Router>
  );
};

export default MyRouter;