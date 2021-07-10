// Import Library
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';

// Import Component
import CustomAlert from '../../../components/Alert';
import CustomSelect from '../../../components/Select';
import CustomChart from '../../../components/Chart';

// Import utils
import { getListOfMonths } from '../../../utils/date';

// Import API
import { apiGetPabrik } from '../../../api/pabrik.api';
import { apiGetHasilProduksiGraph } from '../../../api/hasil-produksi.api';

const FactoryProducation = () => {
  const [month, setMonth] = useState('');
  const [pabrik, setPabrik] = useState('');
  const [series, setSeries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchGraphHasilProduksi = async () => {
    const payload = {
      pabrik,
      month,
      year: (new Date()).getFullYear(),
    };

    await apiGetHasilProduksiGraph(payload)
        .then((i) => {
          const { response: { data } } = i;
          setSeries(data.data);
        })
        .catch((err) => {
          setErrorMessage(
              err?.message ||
              'Gagal mengambil data hasil produksi',
          );
        });
  };

  useEffect(() => {
    if (pabrik && month) fetchGraphHasilProduksi();
  }, [month, pabrik]);

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
        <CustomChart
          series={series}
          type="bar"
          ytitle="Jumlah (kg)"
          xtitle={month && moment.months(month - 1)}
        />
      </Grid>
    </Grid>
  );
};

export default FactoryProducation;
