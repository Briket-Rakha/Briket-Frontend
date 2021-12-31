// Import Library
import React from 'react';
import { Container } from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Routes List
import Routes from './RouteList';

// Import Layout
import Layout from '../Layout';

// Import Utils
import { hasAccess, DEFAULT_REDIRECT } from 'utils/roles';

const PrivateRoute = ({ component: Component, pageAccess, ...rest }) => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const authorized = hasAccess(parseInt(user.role), pageAccess);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (user && authorized) {
            return (
              <Layout>
                <Container className={rest.path === '/manage' ? 'custom-container' : ''} maxWidth="md" fixed>
                  <Component {...props} />
                </Container>
              </Layout>
            );
          }
          if (user) return <Redirect to={DEFAULT_REDIRECT[user.role]} />;
          else return <Redirect to={Routes.login.root} />;
        }}
      />
    </div>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  pageAccess: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PrivateRoute;
