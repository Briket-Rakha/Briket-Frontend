// Import Library
import React from 'react';
import { Container } from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Routes List
import Routes from './RouteList';

// Import Layout
import Layout from '../Layout';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('user') || false;
  console.log(rest);

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <Layout>
              <Container className={rest.path === '/manage' ? 'custom-container' : ''} maxWidth="md" fixed>
                <Component {...props} />
              </Container>
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
