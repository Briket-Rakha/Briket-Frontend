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
  return (
    <Grid container className="dashboard" direction="column">
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Total Brand"
          getData={apiGetTotalBrandDashboard}
          carouselName ="totalbrand"/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Brand Detail"
          getData={apiGetWarehouseSummary}
          getDataDropdown={apiGetWarehouseBrand}
          carouselName ="warehouse"
          dropdownLabel="Brand"
          enableDropdown
          dropdownVal={brand}
          setDropdownVal={setBrand}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="National Price"
          getData={apiGetNationalPriceDashboard}
          carouselName ="nationalprice"/>
      </Grid>
    </Grid>
  );
};

export default DashboardWarehoue;
