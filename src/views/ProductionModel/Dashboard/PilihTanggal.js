// Import Library
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Component
import CustomAlert from '../../../components/Alert';
import DatePicker from '../../../components/DatePicker';
import CustomSelect from '../../../components/Select';

// Import Styling
import '../../../styles/views/pilih-tanggal.scss';

// Import API

const PilihTanggal = (props) => {
  const { downloadName, dropdownAddition } = props;
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const today = new Date();
  const [category, setCategory] = useState('');
  // Date State
  const [startDate, setStartDate] = useState(today.toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(today.toISOString().slice(0, 10));
  // download api url
  const url = dropdownAddition ?
  `${apiBaseUrl}/excel/${category}?start=${startDate}&end=${endDate}` :
  `${apiBaseUrl}/excel/${downloadName}?start=${startDate}&end=${endDate}`;
  //   const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <form className="pilih-tanggal">
      {console.log(url)}
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
        {dropdownAddition ?
          <CustomSelect
            value={category}
            label="Kategori"
            getValues={dropdownAddition}
            setValue={setCategory}
            size="medium"
            constantValues
            required
          /> : ''
        }
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
        <a href={url}>DOWNLOAD</a>
      </Button>
    </form>
  );
};

PilihTanggal.defaultProps = {
  downloadName: '',
};

PilihTanggal.propTypes = {
  downloadName: PropTypes.string.isRequired,
  dropdownAddition: PropTypes.array,
};

export default PilihTanggal;
