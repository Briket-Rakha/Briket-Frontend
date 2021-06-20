// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../../../components/Alert';

// Import Styling
import '../../../../../styles/views/tambah-pabrik.scss';

const TambahMaterial = () => {
  const [name, setName] = useState('');
  const [openAlert] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

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
      <Button className="btn btn-md simpan-btn">
        SIMPAN
      </Button>
    </Grid>
  );
};

export default TambahMaterial;
