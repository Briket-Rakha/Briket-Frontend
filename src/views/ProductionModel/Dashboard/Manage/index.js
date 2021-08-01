// Import Modules
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
// import PropTypes from 'prop-types';

// Import Components
import Sidebar from '../../../../components/Sidebar';
import ItemContainer from './ItemContainer';
import CustomAlert from '../../../../components/Alert';
import CustomModal from '../../../../components/Modal';
import TambahMaterial from '../../../ProductionModel/Input/TambahMaterial';
import TambahBrand from '../../Input/TambahBrand';
import TambahPabrik from '../../Input/TambahPabrik';
import TambahPenjual from '../../Input/TambahPenjual';


const Manage = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangeMenu = (menu) => {
    setActiveMenu(menu);
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
      <Sidebar open activeMenu={activeMenu} setActiveMenu={handleChangeMenu} />
      <Grid item container className="manage" wrap="nowrap">
        <Grid item container className="manage-container">
          {activeMenu === 0 && (
            <>
              <ItemContainer
                title="Material"
                deleteItem={() => {}}
                getItems={() => {}}
                setOpenModal={setOpenModal}
                handleError={setErrorMessage}
              />
              <CustomModal open={openModal} setOpen={setOpenModal}>
                <TambahMaterial />
              </CustomModal>
            </>
          )}
          {activeMenu === 1 && (
            <>
              <ItemContainer
                title="Pabrik"
                deleteItem={() => {}}
                getItems={() => {}}
                setOpenModal={setOpenModal}
                handleError={setErrorMessage}
              />
              <CustomModal open={openModal} setOpen={setOpenModal}>
                <TambahPabrik />
              </CustomModal>
            </>
          )}
          {activeMenu === 2 && (
            <>
              <ItemContainer
                title="Brand"
                deleteItem={() => {}}
                getItems={() => {}}
                setOpenModal={setOpenModal}
                handleError={setErrorMessage}
              />
              <CustomModal open={openModal} setOpen={setOpenModal}>
                <TambahBrand />
              </CustomModal>
            </>
          )}
          {activeMenu === 3 && (
            <>
              <ItemContainer
                title="Penjual"
                deleteItem={() => {}}
                getItems={() => {}}
                setOpenModal={setOpenModal}
                handleError={setErrorMessage}
              />
              <CustomModal open={openModal} setOpen={setOpenModal}>
                <TambahPenjual />
              </CustomModal>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Manage;
