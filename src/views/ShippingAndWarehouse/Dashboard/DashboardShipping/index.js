// Import Library
import { React, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

// Import Component
import CustomSelect from '../../../../components/Select';
import DashboardCarousel from '../../../../components/DashboardCarousel';

// Import Constants
import { currencyList } from '../../../../constants/currencyList';

// Import styling
import '../../../../styles/views/dashboard.scss';

// Import Utils
import { formatCurrency, numberWithDots } from '../../../../utils/helper';

// Import API
import { apiGetShipping, apiGetContainerShipping } from '../../../../api/shipping.api';

const DashboardShipping = () => {
  const [totalWeight, setTotalWeight] = useState('');
  const [containerWorth, setContainerWorth] = useState('');
  const [charcoalPrice, setCharcoalPrice] = useState('');
  const [container, setContainer] = useState(null);
  const [tipePembayaran, setTipePembayaran] = useState([]);
  const [currency, setCurrency] = useState(null);

  const FALSY_STATE = ['', null, undefined];
  const noData = 'No Data Found!';

  const getShippingData = async () => {
    if (container) {
      {/* TODO: adjust with the currency */}
      await apiGetShipping(container)
          .then((res) => {
            const { response: { data } } = res;
            setTotalWeight(data.result.total_weight);
            setCharcoalPrice(data.result.charcoal_price);
            setTipePembayaran(data.result.shipping_price);
            setContainerWorth(data.result.container_worth);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  useEffect(() => {
    getShippingData();
  }, [container]);

  return (
    <Grid container className="dashboard" direction="column">
      <Grid item className="dashboard-section-content">
        {/* TODO: adjust getData with the currency */}
        <DashboardCarousel
          title="Shipping"
          getData={container ? (() => apiGetShipping({ container_number: container })) : null}
          carouselName ="shipping"
          carouselFields={['name', 'asal', 'package_name']}
          enableDropdown
          dropdownLabel={['Container']}
          getDataDropdown={[apiGetContainerShipping]}
          dropdownVal={[container]}
          setDropdownVal={[setContainer]}
          customGetDataDropdown={[false]}/>
      </Grid>
      <Grid container className="dashboard-section-header">
        <Grid
          container
        >
        </Grid>
        <Grid container className="dashboard-section-header-input">
          <CustomSelect
            value={currency}
            label={'Currency'}
            getValues={currencyList}
            setValue={setCurrency}
            constantValues
            size="small"
          />
        </Grid>
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
              <td>{FALSY_STATE.includes(totalWeight) ? noData : numberWithDots(totalWeight) + ' kg'}</td>
            </tr>
            <tr>
              <td>Container Worth</td>
              <td>:</td>
              <td>{FALSY_STATE.includes(containerWorth) ? noData : formatCurrency(containerWorth)}</td>
            </tr>
            <tr>
              <td>Charcoal Price</td>
              <td>:</td>
              <td>{FALSY_STATE.includes(charcoalPrice) ? noData : formatCurrency(charcoalPrice)}</td>
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
            {tipePembayaran.length == 0 ?
            <p style={{ color: '#d32f2f', fontStyle: 'italic', fontWeight: '500' }}>{noData}</p> :
            (tipePembayaran.map((el, idx) => (
              <tr key={el.idx}>
                <td>{el.nama_pembayaran}</td>
                <td>:</td>
                <td>{FALSY_STATE.includes(el.harga) ? noData : formatCurrency(el.harga)}</td>
              </tr>
            )))}
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
