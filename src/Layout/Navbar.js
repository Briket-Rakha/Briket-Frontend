/* eslint-disable react/prop-types */
// Import Library
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Import style
import '../styles/layout/navbar.scss';

// Import reducer action (Logout)
import { logOut } from '../actions/authActions';

// Import Router list
import Routes from '../router/RouteList';

const Navbar = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogout = () => {
    dispatch(logOut());
    history.push(Routes.login.root);
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="navbar">
        <Grid item className="navbar-brand">
          <img src={`${process.env.PUBLIC_URL}/images/logo-text.jpg`} />
        </Grid>
        <Grid container className="navbar-list">
          <Grid item className="navbar-list-item">
            PRODUCTION MODEL
          </Grid>
          <Grid item className="navbar-list-item">
            INDONESIA TRANSPORTATION
          </Grid>
          <Grid item className="navbar-list-item">
            DESTINATION TRANSPORTATION
          </Grid>
          <Grid item className="navbar-list-item">
            OPERATIONAL
          </Grid>
          <Grid item className="navbar-list-item">
            SALES
          </Grid>
        </Grid>
        <Grid item className="navbar-list-item">
          <Button color="inherit" className="logout-btn" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
        <IconButton
          edge="start"
          className="hamburger-btn"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
