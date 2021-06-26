// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../components/Alert';

// Import Styling
import '../../../styles/views/tambah-pabrik.scss';

// Import API
import { apiPostPabrik } from '../../../api/pabrik.api';

const TambahPabrik = () => {
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

  const resetInput = () => {
    setInputState((prev) => (
      Object.fromEntries(
          Object.entries(prev).map(
              ([key, value], index) => [key, ''],
          ),
      )
    ));
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
      await apiPostPabrik(payload)
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

      resetInput();
    }
  };

  const { name, address, city, zipcode, phone } = inputState;

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
          label="Nama Pabrik"
          placeholder="Masukkan Nama Pabrik*"
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
          multiline
          rows={1}
          rowsMax={3}
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
          onChange={handleChange}
        />
      </Grid>
      <Button type="submit" className="btn btn-lg simpan-btn">
        {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
      </Button>
    </form>
  );
};

export default TambahPabrik;
