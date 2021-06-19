/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// Import Library
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Import style
import '../styles/layout/navbar.scss';

// Import reducer action (Logout)
import { logOut, setTab } from '../actions';

// Import Router list
import Routes from '../router/RouteList';

const Navbar = () => {
  const { activeTab } = useSelector((state) => state.tabReducer);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogout = () => {
    dispatch(logOut());
    history.push(Routes.login.root);
  };

  const handleChangeTab = (tab) => {
    dispatch(setTab(tab));
  };

  const tabs = [
    {
      id: 0,
      name: 'PRODUCTION MODEL',
    },
    {
      id: 1,
      name: 'INDONESIA TRANSPORTATION',
    },
    {
      id: 2,
      name: 'DESTINATION TRANSPORTATION',
    },
    {
      id: 3,
      name: 'OPERATIONAL',
    },
    {
      id: 4,
      name: 'SALES',
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar className="navbar">
        <Grid item className="navbar-brand">
          <img src={`${process.env.PUBLIC_URL}/images/logo-text.jpg`} />
        </Grid>
        <Grid container className="navbar-list">
          {tabs.map((tab) => (
            <Grid
              key={tab.id}
              item
              className={activeTab === tab.id ? 'navbar-list-item active-tab' : 'navbar-list-item'}
              onClick={() => handleChangeTab(tab.id)}
            >
              {tab.name}
            </Grid>
          ))}
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
