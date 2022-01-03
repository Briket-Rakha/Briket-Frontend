// Import Library
import React from 'react';
import { Container } from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

// Import Routes List
import Routes from './RouteList';

// Import Layout
import Layout from '../Layout';

// Import Utils
import { hasAccess, DEFAULT_REDIRECT } from 'utils/roles';

// Import Actions
import { setUser } from 'redux/actions/authActions';

const PrivateRoute = ({ component: Component, pageAccess, ...rest }) => {
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem('user')) || {};
  const isAuthorized = auth ? hasAccess(parseInt(auth.role), pageAccess) : false;

  if (!isEmpty(auth)) dispatch(setUser(auth));

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (!isEmpty(auth) && isAuthorized) {
            return (
              <Layout>
                <Container className={rest.path === '/manage' ? 'custom-container' : ''} maxWidth="md" fixed>
                  <Component {...props} />
                </Container>
              </Layout>
            );
          }
          if (!isEmpty(auth)) return <Redirect to={DEFAULT_REDIRECT[user.role]} />;
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
