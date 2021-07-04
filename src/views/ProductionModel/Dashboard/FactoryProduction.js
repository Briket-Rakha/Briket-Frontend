// Import Library
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../components/Alert';
import CustomSelect from '../../../components/Select';
import CustomChart from '../../../components/Chart';

// Import utils
import { getListOfMonths } from '../../../utils/date';

// Import API
import { apiGetPabrik } from '../../../api/pabrik.api';

const FactoryProducation = () => {
  const [month, setMonth] = useState();
  const [pabrik, setPabrik] = useState();
  const [series] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchListMonths = async () => {
    await getListOfMonths()
        .then(console.log)
        .catch(console.log);
  };

  useEffect(() => {
    fetchListMonths();
  });

  return (
    <Grid container className="dashboard-section" direction="column">
      {Boolean(errorMessage) && (
        <CustomAlert
          type={'error'}
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}
      <Grid container className="dashboard-section-header">
        <Grid
          container
          className="dashboard-section-header-title"
          direction="column"
        >
          <h3>Grafik Produksi Pabrik</h3>
          <p>Total: 100.000kg</p>
        </Grid>
        <Grid container className="dashboard-section-header-input">
          <CustomSelect
            value={month}
            label="Bulan"
            getValues={getListOfMonths}
            setValue={setMonth}
            size="small"
          />
          <CustomSelect
            value={pabrik}
            label="Pabrik"
            getValues={apiGetPabrik}
            setValue={setPabrik}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomChart series={series} type="bar" />
      </Grid>
    </Grid>
  );
};

export default FactoryProducation;
