// Import Library
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

// Import views
import CustomizeCarousel from '../../../ProductionModel/Dashboard/CustomizeCarousel';

// Import styling
import '../../../../styles/views/dashboard.scss';

// Import API
import { apiGetWarehouse } from '../../../../api/warehouse.api';
import { apiGetTrucking } from '../../../../api/trucking.api';
import { apiGetWarehouseBrand, apiGetWarehouseSummary } from '../../../../api/input-warehouse.api';

const DashboardWarehoue = () => {
  const [brand, setBrand] = useState('');
  return (
    <Grid container className="dashboard" direction="column">
      {/* TODO: call the right api for getData, set the right attribute to show */}
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Warehouse"
          getData={apiGetWarehouseSummary}
          getDataDropdown={apiGetWarehouseBrand}
          carouselName ="warehouse"
          dropdownLabel="Brand"
          enableDropdown
          dropdownVal={brand}
          setDropdownVal={setBrand}/>
      </Grid>
      {/* TODO: delete dropdown, call the right api for getData */}
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="National Price"
          getData={apiGetTrucking}
          getDataDropdown={apiGetWarehouse}
          carouselName ="nationalprice"
          dropdownLabel="Warehouse"
          enableDropdown
          dropdownVal={brand}
          setDropdownVal={setBrand}/>
      </Grid>
      {/* TODO: delete dropdown, call the right api for getData */}
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Ini Apa??"
          getData={apiGetTrucking}
          getDataDropdown={apiGetWarehouse}
          carouselName ="nationalprice"
          dropdownLabel="Warehouse"
          enableDropdown
          dropdownVal={brand}
          setDropdownVal={setBrand}/>
      </Grid>
    </Grid>
  );
};

export default DashboardWarehoue;
