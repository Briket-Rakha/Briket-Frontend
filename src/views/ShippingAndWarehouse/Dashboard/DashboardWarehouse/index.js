// Import Library
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

// Import views
import CustomizeCarousel from '../../../ProductionModel/Dashboard/CustomizeCarousel';

// Import styling
import '../../../../styles/views/dashboard.scss';

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
        <CustomizeCarousel
          title="Total Charcoal"
          getData={apiGetTotalBrandDashboard}
          carouselName ="totalbrand"
          carouselFields={['name']}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Charcoal Packaging Details"
          getData={brand ? (() => apiGetWarehouseSummary(brand)) : null}
          getDataDropdown={[apiGetWarehouseBrand]}
          carouselName ="warehouse"
          dropdownLabel={['Brand']}
          enableDropdown
          dropdownVal={[brand]}
          setDropdownVal={[setBrand]}
          carouselFields={['name', 'package']}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        {/* TODO: change getDataDropdown */}
        {/* TODO: adjust getData with the currency */}
        <CustomizeCarousel
          title="National Price"
          getData={apiGetNationalPriceDashboard}
          carouselName ="nationalprice"
          carouselFields={['name']}
          getDataDropdown={[apiGetWarehouseBrand]}
          dropdownLabel={['Currency']}
          enableDropdown
          dropdownVal={[currencyNP]}
          setDropdownVal={[setCurrencyNP]}/>
      </Grid>
    </Grid>
  );
};

export default DashboardWarehoue;
