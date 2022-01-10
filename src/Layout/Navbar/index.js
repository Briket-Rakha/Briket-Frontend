/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// Import Library
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  ClickAwayListener,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Import style
import '../../styles/layout/navbar.scss';

// Import reducer action (Logout)
import { logout } from 'redux/actions/authActions';

// Import Router list
import Routes from '../../router/RouteList';

// Import Component
import PopMenu from '../../components/PopMenu';

// Import Menu
import menu from './menuList';
import { setTab } from 'redux/actions/tabActions';

const Navbar = () => {
  const history = useHistory();
  const { activeTab } = useSelector((state) => state.tab);
  const [anchorEl, setAnchorEl] = useState(null);
  const [childAnchor, setChildAnchor] = useState(false);
  const [gChildAnchor, setGChildAnchor] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const mapPathToTab = {
      'shipping': 1,
      'warehouse': 2,
    };
    const currentTab = mapPathToTab[history.location.pathname.split('/')[1]] || 0;
    dispatch(setTab(currentTab));
  }, []);

  // Close popper when route change
  useEffect(() => {
    handleClose();
  }, [history.location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    history.push(Routes.login.root);
  };

  const handleOpenPop = (e, value) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setGChildAnchor(null);
    setChildAnchor(null);
  };

  const handleChild = (e) => {
    setGChildAnchor(false);
    setChildAnchor(e.currentTarget);
  };

  const handleGChild = (e) => {
    setGChildAnchor(e.currentTarget);
  };

  const leavePopper = () => {
    setChildAnchor(false);
    setGChildAnchor(false);
  };

  return (
    <AppBar position="absolute">
      <Toolbar className="navbar">
        <Grid item className="navbar-brand">
          <img src={`${process.env.PUBLIC_URL}/images/logo-text.jpg`} />
        </Grid>
        <Grid container className="navbar-list" spacing={1}>
          {menu.map((tab) => (
            <Grid
              key={tab.id}
              item
              className={
                tab.id == activeTab ?
                  'navbar-list-item active-tab' :
                  'navbar-list-item'
              }
              onClick={(e) => handleOpenPop(e, tab.id)}
            >
              <Grid item style={{ padding: '8px 4px' }}>
                {tab.name}
                {Boolean(anchorEl) && (
                  <ClickAwayListener onClickAway={handleClose}>
                    <Grid item container onMouseLeave={leavePopper}>
                      <PopMenu
                        tabId={tab.id}
                        anchorEl={anchorEl}
                        items={tab.name === anchorEl.textContent ? tab.sub : []}
                        handleClose={handleClose}
                        childAnchor={childAnchor}
                        handleChild={handleChild}
                        gChildAnchor={gChildAnchor}
                        handleGChild={handleGChild}
                      />
                    </Grid>
                  </ClickAwayListener>
                )}
              </Grid>
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
