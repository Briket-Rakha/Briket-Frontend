// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../../../components/Alert';

// Import Styling
import '../../../../../styles/views/tambah-pabrik.scss';

const TambahPabrik = () => {
  const [inputState, setInputState] = useState({
    name: '',
    address: '',
    city: '',
    zipcode: '',
    phone: '',
  });
  const [openAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { name, address, city, zipcode, phone } = inputState;

  return (
    <Grid item className="tambah-pabrik">
      {openAlert && (
        <CustomAlert
          type="error"
          message={errorMessage}
          onClose={() => setOpenAlert(false)}
        />
      )}
      <Grid item className="tambah-pabrik-form">
        <TextField
          id="name"
          name="name"
          className="input-field"
          placeholder="Nama Pabrik*"
          label="Masukkan Nama Pabrik"
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
          name="kota"
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
      <Button className="btn btn-md simpan-btn">
        SIMPAN
      </Button>
    </Grid>
  );
};

export default TambahPabrik;
