// Import Library
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../components/Alert';
import DatePicker from '../../../components/DatePicker';

// Import Styling
import '../../../styles/views/pilih-tanggal.scss';

// Import API

const TambahBrand = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  //   const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClickDownload = async (e) => {
    console.log('hleo');
  };

  return (
    <form className="pilih-tanggal" onSubmit={handleClickDownload}>
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
      <Grid item className="pilih-tanggal-header">
        <h2>Pilih Tanggal</h2>
      </Grid>
      <Grid item className="pilih-tanggal-form">
        <DatePicker
          label="Dari"
          value={startDate}
          setValue={setStartDate}
          required/>
        <DatePicker
          label="Sampai"
          value={endDate}
          setValue={setEndDate}
          required/>
      </Grid>
      <Button
        type="submit"
        className="btn btn-lg download-btn"
      >
        DOWNLOAD
      </Button>
    </form>
  );
};

export default TambahBrand;
