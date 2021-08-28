// Import Library
import { React, useState } from 'react';
import { Grid } from '@material-ui/core';

// Import views
import CustomizeCarousel from '../../../ProductionModel/Dashboard/CustomizeCarousel';

// Import styling
import '../../../../styles/views/dashboard.scss';

// Import Utils
import { formatCurrency } from '../../../../utils/helper';

// Import API
import { apiGetInputPackaging,
  apiGetContainer } from '../../../../api/input-packaging.api';

const DashboardShipping = () => {
  // const [totalWeight, setTotalWeight] = useState('');
  // const [charcoalPrice, setCharcoalPrice] = useState('');

  const [totalWeight] = useState('X');
  const [charcoalPrice] = useState('X');

  const [tipePembayaran] = useState([
    { id: 0, name: 'Pembayaran A', price: 'X' },
    { id: 1, name: 'Pembayaran B', price: 'X' },
    { id: 2, name: 'Pembayaran C', price: 'X' },
  ]);

  return (
    <Grid container className="dashboard" direction="column">
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title=""
          getData={apiGetInputPackaging}
          getDataDropdown={apiGetContainer}
          carouselName ="packaging"
          dropdownLabel="Container"
          enableDropdown
          addition/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <Grid
          item xs={8}
          className="dashboard-section-header-title"
          direction="column"
        >
          <h3>Description</h3>
        </Grid>
        <table className="dashboard-section-content-table">
          <tbody>
            <tr>
              <td>Total Weight</td>
              <td>:</td>
              <td>{totalWeight}</td>
            </tr>
            <tr>
              <td>Charcoal Price</td>
              <td>:</td>
              <td>{formatCurrency(charcoalPrice)}</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </Grid>
      <Grid item className="dashboard-section-content">
        <Grid
          item xs={8}
          className="dashboard-section-header-title"
          direction="column"
        >
          <h3>Shipping Price</h3>
        </Grid>
        <table className="dashboard-section-content-table">
          <tbody>
            {tipePembayaran.map(({ id, name, price }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>:</td>
                <td>{formatCurrency(price)}</td>
              </tr>
            ))}
            <tr>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default DashboardShipping;
