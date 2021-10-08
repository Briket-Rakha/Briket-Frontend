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
import { apiGetOutsourceProduksiGraph, apiGetOutsourceProduksiYear } from '../../../api/supplier.api';

const OutsourceProduction = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [series, setSeries] = useState([]);
  const [total, setTotal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGraphOutsourceProduksi = async () => {
    const payload = {
      bulan: month,
      tahun: year,
    };

    setLoading(true);
    await apiGetOutsourceProduksiGraph(payload)
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
    if (month && year) fetchGraphOutsourceProduksi();
  }, [month, year]);

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
          <h3>Outsource Production Chart</h3>
          <p>{`Total: ${total} kg`}</p>
        </Grid>
        <Grid container className="dashboard-section-header-input">
          <CustomSelect
            value={month}
            label="Month"
            getValues={getListOfMonths}
            setValue={setMonth}
            size="small"
          />
          <CustomSelect
            value={year}
            label="Year"
            getValues={apiGetOutsourceProduksiYear}
            setValue={setYear}
            size="small"
            customField="YEAR(date)"
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

export default OutsourceProduction;
