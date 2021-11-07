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
  const [category, setCategory] = useState('');
  // Date State
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // download api url
  const url = dropdownAddition ?
  `${apiBaseUrl}/excel/${category}?
    start=${startDate?.toISOString().slice(0, 10)}
    &end=${endDate?.toISOString().slice(0, 10)}` :
  `${apiBaseUrl}/excel/${downloadName}?
    start=${startDate?.toISOString().slice(0, 10)}
    &end=${endDate?.toISOString().slice(0, 10)}`;
  //   const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDownload = () => {
    window.open(url);
  };

  return (
    <form className="pilih-tanggal" onSubmit={handleDownload}>
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
        <h2>Select Date</h2>
      </Grid>
      <Grid item className="pilih-tanggal-form">
        {dropdownAddition ?
          <CustomSelect
            value={category}
            label="Category"
            getValues={dropdownAddition}
            setValue={setCategory}
            size="medium"
            constantValues
            required
          /> : ''
        }
        <DatePicker
          label="From"
          value={startDate}
          setValue={setStartDate}
          required/>
        <DatePicker
          label="To"
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

PilihTanggal.defaultProps = {
  downloadName: '',
};

PilihTanggal.propTypes = {
  downloadName: PropTypes.string.isRequired,
  dropdownAddition: PropTypes.array,
};

export default PilihTanggal;
