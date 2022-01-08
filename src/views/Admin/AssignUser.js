// Import Modules
import React, { useState, useMemo } from 'react';
import { Grid } from '@material-ui/core';
// import PropTypes from 'prop-types';

// Import Components
import Sidebar from 'components/Sidebar';
import CustomAlert from 'components/Alert';


const AssignUser = () => {
  const prevActiveMenu = parseInt(localStorage.getItem('admin-active-menu'));
  const [activeMenu, setActiveMenu] = useState( prevActiveMenu || 0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const menu = useMemo(() => [
    'Assign User',
  ]);

  const handleChangeMenu = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem('manage-active-menu', menu);
    setOpenModal(false);
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
      <Sidebar open menu={menu} activeMenu={activeMenu} setActiveMenu={handleChangeMenu} />
      <Grid container direction="column" style={{ marginLeft: 125 }}>
        <h1 style={{ marginBottom: 40 }}>Admin Dashboard</h1>
        <h2 style={{ marginBotton: 20, fontWeight: 500 }}>{menu[activeMenu]}</h2>
      </Grid>
    </>
  );
};

export default AssignUser;
