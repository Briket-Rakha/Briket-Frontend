// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Component
import CustomAlert from '../../../components/Alert';

// Import Styling
import '../../../styles/views/tambah-pabrik.scss';

// Import API
import {
  apiPostSupplierMaterial, apiPostSupplierOutsource,
} from '../../../api/supplier.api';

const TambahPenjual = ({ type }) => {
  const [inputState, setInputState] = useState({
    name: '',
    address: '',
    city: '',
    zipcode: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickSimpan = async (e) => {
    e.preventDefault();

    if (!loading) {
      setLoading(true);

      const payload = {
        name,
        address,
        city,
        zipcode,
        phone,
      };

      if (type === 'material') {
        await apiPostSupplierMaterial(payload)
            .then((i) => {
              const { response: { data } } = i;
              setSuccessMessage(data?.message);
              setLoading(false);
              window.location.reload(true);
            })
            .catch((err) => {
              setErrorMessage(err?.message ? err.message : 'Server Error');
              setLoading(false);
            });
      } else if (type === 'outsource') {
        await apiPostSupplierOutsource(payload)
            .then((i) => {
              const { response: { data } } = i;
              setSuccessMessage(data?.message);
              setLoading(false);
              window.location.reload(true);
            })
            .catch((err) => {
              setErrorMessage(err?.message ? err.message : 'Server Error');
              setLoading(false);
            });
      }

      resetInput();
    }
  };

  const resetInput = () => {
    setInputState((prev) => (
      Object.fromEntries(
          Object.entries(prev).map(
              ([key, value], index) => [key, ''],
          ),
      )
    ));
  };

  const { name, address, city, zipcode, phone } = inputState;

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
        <TextField
          id="name"
          name="name"
          className="input-field"
          label="Seller Name"
          placeholder="Please enter the seller name*"
          size="medium"
          value={name}
          type="text"
          variant="outlined"
          required
          onChange={handleChange}
        />
        <TextField
          id="address"
          name="address"
          className="input-field"
          placeholder="Please enter the address*"
          label="Address"
          size="medium"
          value={address}
          type="text"
          variant="outlined"
          required
          rows={2}
          onChange={handleChange}
        />
        <TextField
          id="kota"
          name="city"
          className="input-field"
          placeholder="Please enter the city*"
          label="City"
          size="medium"
          value={city}
          type="text"
          variant="outlined"
          required
          onChange={handleChange}
        />
        <TextField
          id="zipcode"
          name="zipcode"
          className="input-field"
          placeholder="Please enter the postal code*"
          label="Postal Code"
          size="medium"
          value={zipcode}
          type="text"
          variant="outlined"
          required
          onChange={handleChange}
        />
        <TextField
          id="phone"
          name="phone"
          className="input-field"
          placeholder="Please enter the phone number*"
          label="Phone Number"
          size="medium"
          value={phone}
          type="text"
          variant="outlined"
          required
          rows={2}
          onChange={handleChange}
        />
      </Grid>
      <Button type="submit" className="btn btn-lg simpan-btn">
        {loading ? <CircularProgress size={20} thickness={5} /> : 'SUBMIT'}
      </Button>
    </form>
  );
};

TambahPenjual.defaultProps = {
  type: 'material',
};


TambahPenjual.propTypes = {
  type: PropTypes.string,
};

export default TambahPenjual;
