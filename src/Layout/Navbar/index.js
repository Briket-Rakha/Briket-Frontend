/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// Import Library
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { logOut } from '../../actions';

// Import Router list
import Routes from '../../router/RouteList';

// Import Component
import PopMenu from '../../components/PopMenu';

const Navbar = (props) => {
  const history = useHistory();
  const { activeTab } = useSelector((state) => state.tabReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const [childAnchor, setChildAnchor] = useState(false);
  const [gChildAnchor, setGChildAnchor] = useState(false);

  const dispatch = useDispatch();

  // Close popper when route change
  useEffect(() => {
    handleClose();
  }, [history.location.pathname]);

  const handleLogout = () => {
    dispatch(logOut());
    history.push(Routes.login.root);
  };

  const handleOpenPop = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setGChildAnchor(null);
    setChildAnchor(null);
  };

  const handleChild = (e) => {
    setChildAnchor(e.currentTarget);
  };

  const handleGChild = (e) => {
    // setChildAnchor(e.currentTarget.parentNode);
    setGChildAnchor(e.currentTarget);
  };

  const tabs = [
    {
      id: 0,
      name: 'PRODUCTION MODEL',
      route: Routes.production.dashboard,
      sub: [
        {
          id: 0,
          name: 'DASHBOARD',
          onClick: () => {
            history.push(Routes.production.dashboard);
          },
        },
        {
          id: 1,
          name: 'INPUT',
          sub: [
            {
              id: 0,
              name: 'SELF PRODUCE',
              sub: [
                {
                  id: 0,
                  name: 'RAW MATERIAL',
                  onClick: () => {
                    history.push(
                        Routes.production.input.selfProduce.rawMaterial,
                    );
                  },
                },
                {
                  id: 1,
                  name: 'HASIL PRODUKSI',
                  onClick: () => {
                    history.push(
                        Routes.production.input.selfProduce.hasilProduksi,
                    );
                  },
                },
              ],
              onClick: () => { },
            },
            {
              id: 1,
              name: 'OUTSOURCE',
              sub: [
                {
                  id: 0,
                  name: 'CHARCOAL',
                  onClick: () => {
                    history.push(
                        Routes.production.input.outSource.charcoal,
                    );
                  },
                },
                {
                  id: 1,
                  name: 'PAYMENT',
                  onClick: () => {
                    history.push(
                        Routes.production.input.outSource.payment,
                    );
                  },
                },
              ],
            },
            {
              id: 2,
              name: 'PACKAGING',
              onClick: () => {
                history.push(Routes.production.input.packaging);
              },
            },
          ],
          onClick: () => { },
        },
        {
          id: 2,
          name: 'PAYMENT TIMELINE',
          onClick: () => {
            history.push(Routes.production.payment);
          },
        },
        {
          id: 3,
          name: 'MANAGE',
          onClick: () => {
            history.push(Routes.production.manage);
          },
        },
      ],
    },
    {
      id: 1,
      name: 'SHIPPING MODEL',
      route: Routes.shipping.dashboard,
      sub: [
        {
          id: 0,
          name: 'INPUT',
          onClick: () => {
            history.push(Routes.shipping.input);
          },
        },
        {
          id: 1,
          name: 'DASHBOARD',
          onClick: () => {
            history.push(Routes.shipping.dashboard);
          },
        },
      ],
    },
    {
      id: 2,
      name: 'TRUCKING MODEL',
      route: Routes.warehouse.dashboard,
      sub: [
        {
          id: 0,
          name: 'INPUT',
          onClick: () => {
            history.push(Routes.warehouse.input);
          },
        },
        {
          id: 1,
          name: 'DASHBOARD',
          onClick: () => {
            history.push(Routes.warehouse.input);
          },
        },
      ],
    },
  ];

  return (
    <AppBar position="absolute">
      <Toolbar className="navbar">
        <Grid item className="navbar-brand">
          <img src={`${process.env.PUBLIC_URL}/images/logo-text.jpg`} />
        </Grid>
        <Grid container className="navbar-list">
          {tabs.map((tab) => (
            <Grid
              key={tab.id}
              item
              className={
                activeTab === tab.id ?
                  'navbar-list-item active-tab' :
                  'navbar-list-item'
              }
              onClick={handleOpenPop}
            >
              {tab.name}
              {Boolean(anchorEl) && (
                <ClickAwayListener onClickAway={handleClose}>
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
                </ClickAwayListener>
              )}
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
