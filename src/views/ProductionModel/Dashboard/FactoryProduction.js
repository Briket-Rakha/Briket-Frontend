// Import Library
import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import moment from 'moment';

// Import Component
import CustomAlert from '../../../components/Alert';
import CustomSelect from '../../../components/Select';
import CustomChart from '../../../components/Chart';

// Import utils
import { getListOfMonths } from '../../../utils/date';

// Import API
import { apiGetPabrik } from '../../../api/pabrik.api';
import { apiGetHasilProduksiGraph, apiGetHasilProduksiYear } from '../../../api/hasil-produksi.api';

const FactoryProduction = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [pabrik, setPabrik] = useState('');
  const [series, setSeries] = useState([]);
  const [total, setTotal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGraphHasilProduksi = async () => {
    const payload = {
      pabrik,
      bulan: month,
      tahun: year,
    };
    setLoading(true);
    await apiGetHasilProduksiGraph(payload)
        .then((i) => {
          const { data } = i;
          setSeries(data.data);
          setTotal(data.total);
          setLoading(false);
        })
        .catch((err) => {
          setErrorMessage(
              err?.message ||
              'Failed to get data',
          );
          setLoading(false);
        });
  };

  useEffect(() => {
    if (pabrik && month && year) fetchGraphHasilProduksi();
  }, [month, year, pabrik]);

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
          <h3>Factory Production Chart</h3>
          <p>{`Total: ${total || 0} kg`}</p>
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
            value={year}
            label="Tahun"
            getValues={apiGetHasilProduksiYear}
            setValue={setYear}
            size="small"
            customField="YEAR(date)"
          />
          <CustomSelect
            value={pabrik}
            label="Factory"
            getValues={apiGetPabrik}
            setValue={setPabrik}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid item className="dashboard-section-content">
        {loading ?
          <Grid item className="loading-graph">
            <CircularProgress size={60} thickness={6} />
          </Grid> :
          <CustomChart
            series={series}
            type="bar"
            ytitle="Jumlah (kg)"
            xtitle={(month && year) && `${moment.months(month - 1)} - ${year}`}
          />
        }
      </Grid>
    </Grid>
  );
};

export default FactoryProduction;
