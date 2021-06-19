// Import Library
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Routes List
import Routes from './RouteList';

// Import Layout
import Layout from '../Layout';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token') || false;

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          token ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to={Routes.login.root} />
          )
        }
      />
    </div>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;
