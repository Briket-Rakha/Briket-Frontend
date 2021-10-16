// Import Library
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

// Import Component
import DashboardCarousel from '../../../../components/DashboardCarousel';

// Import styling
import '../../../../styles/views/dashboard.scss';

// Import Constants
import { currencyList } from '../../../../constants/currencyList';

// Import API
import {
  apiGetWarehouseBrand,
  apiGetWarehouseSummary,
  apiGetNationalPriceDashboard,
  apiGetTotalBrandDashboard,
} from '../../../../api/input-warehouse.api';

const DashboardWarehoue = () => {
  const [brand, setBrand] = useState('');
  const [currencyNP, setCurrencyNP] = useState(null);
  return (
    <Grid container className="dashboard" direction="column">
      <Grid item className="dashboard-section-content">
        <DashboardCarousel
          title="Total Charcoal"
          getData={apiGetTotalBrandDashboard}
          carouselName ="totalbrand"
          carouselFields={['name']}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <DashboardCarousel
          title="Charcoal Packaging Details"
          getData={brand ? (() => apiGetWarehouseSummary(brand)) : null}
          carouselName ="warehouse"
          carouselFields={['name', 'package']}
          enableDropdown
          dropdownLabel={['Brand']}
          dropdownVal={[brand]}
          getDataDropdown={[apiGetWarehouseBrand]}
          setDropdownVal={[setBrand]}
          customGetDataDropdown={[false]}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        {/* TODO: adjust getData with the currency */}
        <DashboardCarousel
          title="National Price"
          getData={apiGetNationalPriceDashboard}
          carouselName ="nationalprice"
          carouselFields={['name']}
          enableDropdown
          getDataDropdown={[currencyList]}
          dropdownLabel={['Currency']}
          dropdownVal={[currencyNP]}
          setDropdownVal={[setCurrencyNP]}
          customGetDataDropdown={[true]}/>
      </Grid>
    </Grid>
  );
};

export default DashboardWarehoue;
