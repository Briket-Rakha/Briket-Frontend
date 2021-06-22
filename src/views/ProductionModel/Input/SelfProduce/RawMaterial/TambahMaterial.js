// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../../../components/Alert';

// Import Styling
import '../../../../../styles/views/tambah-pabrik.scss';

// Import API
import { apiPostMaterial } from '../../../../../api/material.api';

const TambahMaterial = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const resetInput = () => {
    setName('');
  };

  const handleClickSimpan = async () => {
    if (!loading) {
      setLoading(true);

      await apiPostMaterial({ name })
          .then((i) => {
            const { response: { data } } = i;
            setSuccessMessage(data?.message);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err?.message);
            setErrorMessage(err?.message ?? 'Server Error');
            setLoading(false);
          });

      resetInput();
    }
  };

  return (
    <Grid item className="tambah-pabrik">
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
      <Grid item className="tambah-pabrik-form">
        <TextField
          id="name"
          name="name"
          className="input-field"
          placeholder="Masukkan nama jenis material*"
          label="Nama Material"
          size="medium"
          value={name}
          type="text"
          variant="outlined"
          required
          onChange={handleChange}
        />
      </Grid>
      <Button
        className="btn btn-md simpan-btn"
        onClick={handleClickSimpan}
      >
        {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
      </Button>
    </Grid>
  );
};

export default TambahMaterial;
