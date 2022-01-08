// Import Modules
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Menu, Close } from '@material-ui/icons';

// Import styling
import '../../styles/components/sidebar.scss';

const Sidebar = (props) => {
  const { activeMenu, setActiveMenu, menu } = props;
  const [open, setOpen] = useState(parseInt(localStorage.getItem('sidebar')) || 0);

  const handleSidebar = () => {
    setOpen((prev) => prev === 0 ? 1 : 0);
  };

  useEffect(() => {
    localStorage.setItem('sidebar', open);
  }, [open]);

  if (open) {
    return (
      <Grid item container className="sidebar" direction="column">
        <IconButton className="sidebar-close" onClick={handleSidebar}>
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
        <IconButton className="sidebar-button" onClick={handleSidebar}>
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
  activeMenu: PropTypes.number,
  setActiveMenu: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(
      PropTypes.string.isRequired,
  ).isRequired,
};

export default Sidebar;
