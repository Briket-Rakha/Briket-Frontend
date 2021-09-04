// Import Library
import { React, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

// Import views
import CustomizeCarousel from '../../../ProductionModel/Dashboard/CustomizeCarousel';

// Import styling
import '../../../../styles/views/dashboard.scss';

// Import Utils
import { formatCurrency } from '../../../../utils/helper';

// Import API
import { apiGetShipping } from '../../../../api/shipping.api';

import { apiGetInputPackaging,
  apiGetContainer } from '../../../../api/input-packaging.api';

const DashboardShipping = () => {
  const [totalWeight, setTotalWeight] = useState('');
  const [containerWorth] = useState('blom diintegrasi');
  const [charcoalPrice, setCharcoalPrice] = useState('');
  const [container, setContainer] = useState('');
  const [tipePembayaran, setTipePembayaran] = useState([]);

  const payload = {
    container_number: container,
  };

  const getShippingData = async () => {
    await apiGetShipping(payload)
        .then((res) => {
          const { response: { data } } = res;
          setTotalWeight(data.result.total_weight);
          setCharcoalPrice(data.result.charcoal_price);
          setTipePembayaran(data.result.shipping_price);
          return (data.result);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    console.log('halo');
    getShippingData().then((data) => {
      if (data) {
        setTotalWeight(data.result.total_weight);
        setCharcoalPrice(data.result.charcoal_price);
        setTipePembayaran(data.result.shipping_price);
      }
    });
  }, [container]);

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
          dropdownVal={container}
          setDropdownVal={setContainer}
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
              <td>Container Worth</td>
              <td>:</td>
              <td>{containerWorth}</td>
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
            {tipePembayaran.map((el, idx) => (
              <tr key={el.idx}>
                <td>{el.nama_pembayaran}</td>
                <td>:</td>
                <td>{formatCurrency(el.harga)}</td>
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
