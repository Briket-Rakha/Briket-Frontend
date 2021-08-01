// Import Modules
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { menu } from './menu';
import { IconButton } from '@material-ui/core';
import { Menu, Close } from '@material-ui/icons';

// Import styling
import '../../styles/components/sidebar.scss';

const Sidebar = (props) => {
  const { activeMenu, setActiveMenu } = props;
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <Grid item container className="sidebar" direction="column">
        <IconButton className="sidebar-close" onClick={() => setOpen((prev) => !prev)}>
          <Close />
        </IconButton>
        {menu.map((item, index) => (
          <Grid
            item
            key={index}
            className={activeMenu === index ? 'sidebar-menu active' : 'sidebar-menu'}
            onClick={() => setActiveMenu(index)}
          >
            {item}
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <>
        <IconButton className="sidebar-button" onClick={() => setOpen((prev) => !prev)}>
          <Menu />
        </IconButton>
        <div className="sidebar-button-space" />
      </>
    );
  }
};

Sidebar.defaultProps = {
  activeMenu: 0,
};

Sidebar.propTypes = {
  activeMenu: PropTypes.oneOf(Array.from(Array(menu.length).keys())),
  setActiveMenu: PropTypes.func.isRequired,
};

export default Sidebar;
