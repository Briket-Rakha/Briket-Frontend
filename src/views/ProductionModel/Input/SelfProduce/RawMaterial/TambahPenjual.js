// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../../../components/Alert';

// Import Styling
import '../../../../../styles/views/tambah-pabrik.scss';

// Import API
import { apiPostPenjual } from '../../../../../api/penjual.api';

const TambahPenjual = () => {
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

  const handleClickSimpan = async () => {
    if (!loading) {
      setLoading(true);

      const payload = {
        name,
        address,
        city,
        zipcode,
        phone,
      };
      await apiPostPenjual(payload)
          .then((i) => {
            const { response: { data } } = i;
            console.log(data);
            setSuccessMessage(data?.message);
            setLoading(false);
          })
          .catch((err) => {
            setErrorMessage(err?.message ? err.message : 'Server Error');
            setLoading(false);
          });

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
          label="Nama Penjual"
          placeholder="Masukkan Nama Penjual*"
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
          placeholder="Masukkan Alamat*"
          label="Alamat"
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
          placeholder="Masukkan Kota*"
          label="Kota"
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
          placeholder="Masukkan Kode Pos*"
          label="Kode Pos"
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
          placeholder="Masukkan Nomor Telepon*"
          label="No. Telepon"
          size="medium"
          value={phone}
          type="text"
          variant="outlined"
          required
          rows={2}
          onChange={handleChange}
        />
      </Grid>
      <Button
        className="btn btn-lg simpan-btn"
        onClick={handleClickSimpan}
      >
        {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
      </Button>
    </Grid>
  );
};

export default TambahPenjual;
