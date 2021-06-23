// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../components/Alert';

// Import Styling
import '../../../styles/views/tambah-pabrik.scss';

// Import API
import { apiPostMaterial } from '../../../api/material.api';

const TambahBrand = () => {
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

  const handleClickSimpan = async (e) => {
    e.preventDefault();
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
    <form className="tambah-pabrik" onSubmit={handleClickSimpan}>
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
          placeholder="Masukkan nama jenis brand charcoal"
          label="Jenis Brand Charcoal"
          size="medium"
          value={name}
          type="text"
          variant="outlined"
          required
          onChange={handleChange}
        />
      </Grid>
      <Button
        type="submit"
        className="btn btn-lg simpan-btn"
      >
        {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
      </Button>
    </form>
  );
};

export default TambahBrand;
