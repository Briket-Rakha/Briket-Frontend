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
const Dashboard = lazy(() => import('../views/ProductionModel/Dashboard'));
const RawMaterial = lazy(() => import('../views/ProductionModel/Input/SelfProduce/RawMaterial'));
const HasilProduksi = lazy(() => import('../views/ProductionModel/Input/SelfProduce/HasilProduksi'));
const Charcoal = lazy(() => import('../views/ProductionModel/Input/OutSource/Charcoal'));
const Payment = lazy(() => import('../views/ProductionModel/Input/OutSource/Payment'));
const Packaging = lazy(() => import('../views/ProductionModel/Input/Packaging'));
const PaymentTimeline = lazy(() => import('../views/ProductionModel/Payment'));
const Manage = lazy(() => import('../views/ProductionModel/Dashboard/Manage'));
const ShippingDashboard = lazy(() => import('../views/ShippingAndWarehouse/Dashboard/DashboardShipping'));
const WarehouseDashboard = lazy(() => import('../views/ShippingAndWarehouse/Dashboard/DashboardWarehouse'));
const ShippingInput = lazy(() => import('../views/ShippingAndWarehouse/Input/Shipping'));
const WarehouseInput = lazy(() => import('../views/ShippingAndWarehouse/Input/Trucking'));
const NationalPrice = lazy(() => import('../views/ShippingAndWarehouse/Input/NationalPrice'));

// Create Browser History
const browserHistory = createBrowserHistory();

const MyRouter = () => {
  return (
    <Router history={browserHistory}>
      <LastLocationProvider watchOnlyPathname>
        <Switch>
          <PrivateRoute
            path={Routes.production.dashboard}
            component={Dashboard}
            exact
          />
          <PrivateRoute
            path={Routes.production.payment}
            component={PaymentTimeline}
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
            path={Routes.production.input.outSource.charcoal}
            component={Charcoal}
            exact
          />
          <PrivateRoute
            path={Routes.production.input.outSource.payment}
            component={Payment}
            exact
          />
          <PrivateRoute
            path={Routes.production.manage}
            component={Manage}
            exact
          />
          <PrivateRoute
            path={Routes.shipping.dashboard}
            component={ShippingDashboard}
            exact
          />
          <PrivateRoute
            path={Routes.warehouse.dashboard}
            component={WarehouseDashboard}
            exact
          />
          <PrivateRoute
            path={Routes.shipping.input}
            component={ShippingInput}
            exact
          />
          <PrivateRoute
            path={Routes.warehouse.input}
            component={WarehouseInput}
            exact
          />
          <PrivateRoute
            path={Routes.warehouse.nationalPrice}
            component={NationalPrice}
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
