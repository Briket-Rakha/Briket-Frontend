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
import DeleteConfirmation from '../../Input/deleteConfirmation';

// import api
import { apiGetMaterial, apiDeleteMaterial } from '../../../../api/material.api';
import { apiGetPabrik, apiDeletePabrik } from '../../../../api/pabrik.api';
import { apiGetBrand, apiDeleteBrand } from '../../../../api/brand.api';
import { apiGetSupplierMaterial, apiDeleteSupplierMaterial,
  apiGetSupplierOutsource, apiDeleteSupplierOutsource } from '../../../../api/supplier.api';


const Manage = () => {
  const prevActiveMenu = parseInt(localStorage.getItem('manage-active-menu'));

  const [activeMenu, setActiveMenu] = useState( prevActiveMenu || 0);
  const [openModal, setOpenModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [idItemDelete, setIdItemDelete] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangeMenu = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem('manage-active-menu', menu);
    setOpenModal(false);
  };

  const handleDeleteItem = (id) => {
    setConfirmationModal(true);
    setIdItemDelete(id);
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
                deleteItem={handleDeleteItem}
                getItems={apiGetMaterial}
                setOpenModal={setOpenModal}
                handleError={setErrorMessage}
              />
              <CustomModal open={openModal} setOpen={setOpenModal}>
                <TambahMaterial dropdownPabrik={true}/>
              </CustomModal>
              <CustomModal open={confirmationModal} setOpen={setConfirmationModal}>
                <DeleteConfirmation
                  setOpen={setConfirmationModal}
                  deleteItem={apiDeleteMaterial}
                  idItem={idItemDelete}/>
              </CustomModal>
            </>
          )}
          {activeMenu === 1 && (
            <>
              <ItemContainer
                title="Factory"
                deleteItem={handleDeleteItem}
                getItems={apiGetPabrik}
                setOpenModal={setOpenModal}
                handleError={setErrorMessage}
              />
              <CustomModal open={openModal} setOpen={setOpenModal}>
                <TambahPabrik />
              </CustomModal>
              <CustomModal open={confirmationModal} setOpen={setConfirmationModal}>
                <DeleteConfirmation
                  setOpen={setConfirmationModal}
                  deleteItem={apiDeletePabrik}
                  idItem={idItemDelete}/>
              </CustomModal>
            </>
          )}
          {activeMenu === 2 && (
            <>
              <ItemContainer
                title="Brand"
                deleteItem={handleDeleteItem}
                getItems={apiGetBrand}
                setOpenModal={setOpenModal}
                handleError={setErrorMessage}
              />
              <CustomModal open={openModal} setOpen={setOpenModal}>
                <TambahBrand />
              </CustomModal>
              <CustomModal open={confirmationModal} setOpen={setConfirmationModal}>
                <DeleteConfirmation
                  setOpen={setConfirmationModal}
                  deleteItem={apiDeleteBrand}
                  idItem={idItemDelete}/>
              </CustomModal>
            </>
          )}
          {activeMenu === 3 && (
            <>
              <ItemContainer
                title="MAterial's Seller"
                deleteItem={handleDeleteItem}
                getItems={apiGetSupplierMaterial}
                setOpenModal={setOpenModal}
                handleError={setErrorMessage}
              />
              <CustomModal open={openModal} setOpen={setOpenModal}>
                <TambahPenjual />
              </CustomModal>
              <CustomModal open={confirmationModal} setOpen={setConfirmationModal}>
                <DeleteConfirmation
                  setOpen={setConfirmationModal}
                  deleteItem={apiDeleteSupplierMaterial}
                  idItem={idItemDelete}/>
              </CustomModal>
            </>
          )}
          {activeMenu === 4 && (
            <>
              <ItemContainer
                title="Outsource's Seller"
                deleteItem={handleDeleteItem}
                getItems={apiGetSupplierOutsource}
                setOpenModal={setOpenModal}
                handleError={setErrorMessage}
              />
              <CustomModal open={openModal} setOpen={setOpenModal}>
                <TambahPenjual type="outsource"/>
              </CustomModal>
              <CustomModal open={confirmationModal} setOpen={setConfirmationModal}>
                <DeleteConfirmation
                  setOpen={setConfirmationModal}
                  deleteItem={apiDeleteSupplierOutsource}
                  idItem={idItemDelete}/>
              </CustomModal>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Manage;
