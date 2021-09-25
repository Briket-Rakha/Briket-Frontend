// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Component
import CustomAlert from '../../../components/Alert';
import CustomSelect from '../../../components/Select';

// Import Styling
import '../../../styles/views/tambah-pabrik.scss';

// Import API
import { apiPostMaterial } from '../../../api/material.api';
import { apiGetPabrik } from '../../../api/pabrik.api';

const TambahMaterial = ({ pabrik, dropdownPabrik }) => {
  const [name, setName] = useState('');
  const [idPabrik, setPabrik] = useState('');
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

      await apiPostMaterial({ name, id_pabrik: dropdownPabrik ? idPabrik : pabrik })
          .then((i) => {
            const { response: { data } } = i;
            setSuccessMessage(data?.message);
            setLoading(false);
            window.location.reload(true);
          })
          .catch((err) => {
            setErrorMessage(err?.message ?? 'Server Error');
            setLoading(false);
          });

      resetInput();
    }
  };

  return (
    <form item className="tambah-pabrik" onSubmit={handleClickSimpan}>
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
        {
          dropdownPabrik &&
          <CustomSelect
            label="Factory"
            value={idPabrik || pabrik}
            getValues={apiGetPabrik}
            setValue={setPabrik}
            required
          />
        }
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
      <Button type="submit" className="btn btn-lg simpan-btn">
        {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
      </Button>
    </form>
  );
};

TambahMaterial.defaultProps = {
  dropdownPabrik: false,
};

TambahMaterial.propTypes = {
  pabrik: PropTypes.number.isRequired,
  dropdownPabrik: PropTypes.bool,
};

export default TambahMaterial;
