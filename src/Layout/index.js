// Import Libray
import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Navigation Bar
import Navbar from './Navbar/index';

const Layout = ({ children }) => {
  return (
    <Grid item className="page-wrapper">
      <Navbar />
      <main>{children}</main>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
