
// Import Library
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';

// Import Component
import CustomAlert from '../../../components/Alert';

// Import Styling
import '../../../styles/views/delete-confirmation.scss';

const DeleteConfirmation = (props) => {
  const { setOpen, deleteItem, idItem } = props;

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClickSimpan = async (e) => {
    e.preventDefault();
    await deleteItem(idItem)
        .then((i) => {
          const { response: { data } } = i;
          setSuccessMessage(data?.message);
          window.location.reload();
        })
        .catch((err) => {
          setErrorMessage(err?.message ?? 'Server Error');
        });
  };

  return (
    <form item className="delete" onSubmit={handleClickSimpan}>
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
      <Grid item className="delete-form">
        <h2>You are about to delete an item</h2>
        <p>This will delete your item permanently.<br/>Are you sure?</p>
      </Grid>
      <Grid item className="delete-button">
        <Button variant="outlined" className="btn btn-lg cancel-btn" onClick={() => setOpen(false)}>
            CANCEL
        </Button>
        <Button type="submit" className="btn btn-lg delete-btn" startIcon={<Delete />}>
          DELETE
        </Button>
      </Grid>
    </form>
  );
};

DeleteConfirmation.propTypes = {
  setOpen: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  idItem: PropTypes.any.isRequired,
};

export default DeleteConfirmation;
