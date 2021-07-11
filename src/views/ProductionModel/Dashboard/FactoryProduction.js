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
import { apiGetHasilProduksiGraph } from '../../../api/hasil-produksi.api';

const FactoryProduction = () => {
  const [month, setMonth] = useState('');
  const [pabrik, setPabrik] = useState('');
  const [series, setSeries] = useState([]);
  const [total, setTotal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGraphHasilProduksi = async () => {
    const payload = {
      pabrik,
      bulan: month,
      tahun: (new Date()).getFullYear(),
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
              'Gagal mengambil data hasil produksi',
          );
          setLoading(false);
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
            value={pabrik}
            label="Pabrik"
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
            xtitle={month && moment.months(month - 1)}
          />
        }
      </Grid>
    </Grid>
  );
};

export default FactoryProduction;