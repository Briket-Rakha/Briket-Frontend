// Import Modules
import React, { useState, useMemo } from 'react';
import { Grid } from '@material-ui/core';
// import PropTypes from 'prop-types';

// Import Components
import Sidebar from 'components/Sidebar';
import CustomAlert from 'components/Alert';

// Import Styles
import 'styles/views/admin.scss';

const AssignUser = () => {
  const prevActiveMenu = parseInt(localStorage.getItem('admin-active-menu'));
  const [activeMenu, setActiveMenu] = useState( prevActiveMenu || 0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const menu = useMemo(() => [
    'Assign User',
    'Test',
  ]);

  const handleChangeMenu = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem('admin-active-menu', menu);
  };

  const sidebarStyle = {
    backgroundColor: '#287094',
    position: 'relative',
    paddingTop: 48,
  };

  const buttonStyle = {
    left: 10,
  };

  const menuStyle = {
    color: 'white',
  };

  const closeButtonStyle = {
    top: 12,
    color: 'white',
  };

  return (
    <>
      {(Boolean(errorMessage) || Boolean(successMessage)) && (
        <CustomAlert
          type={successMessage ? 'success' : 'error'}
          message={successMessage ? successMessage : errorMessage}
          onClose={successMessage ?
          () => setSuccessMessage('') :
          () => setErrorMessage('')
          }
        />
      )}
      <Grid container wrap="nowrap" className="admin-page">
        <Grid item>
          <Sidebar
            menu={menu}
            activeMenu={activeMenu}
            setActiveMenu={handleChangeMenu}
            sidebarStyle={sidebarStyle}
            buttonStyle={buttonStyle}
            menuStyle={menuStyle}
            closeButtonStyle={closeButtonStyle}
          />
        </Grid>
        <Grid item container direction="column" md={9} className="admin-page-content">
          <h1 style={{ marginBottom: 40 }}>Admin Dashboard</h1>
          <h2 style={{ marginBotton: 20, fontWeight: 500 }}>{menu[activeMenu]}</h2>
        </Grid>
      </Grid>
    </>
  );
};

export default AssignUser;
