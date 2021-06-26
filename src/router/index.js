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
const HasilProduksi = lazy(() => import('../views/ProductionModel/Input/SelfProduce/HasilProduksi'));
const Charcoal = lazy(() => import('../views/ProductionModel/Input/OutSource/Charcoal'));
const Payment = lazy(() => import('../views/ProductionModel/Input/OutSource/Payment'));
const Packaging = lazy(() => import('../views/ProductionModel/Input/Packaging'));

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
            path={Routes.production.input.selfProduce.hasilProduksi}
            component={HasilProduksi}
            exact
          />
          <PrivateRoute
            path={Routes.production.input.packaging}
            component={Packaging}
            exact
          />
          <PrivateRoute
            path={Routes.production.payment}
            component={ProductionModel}
            exact
          />
          <PrivateRoute
            path={Routes.production.input.outSource.charcoal}
            component={Charcoal}
            exact
          />
          <PrivateRoute
            path={Routes.production.input.outSource.payment}
            component={Payment}
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
