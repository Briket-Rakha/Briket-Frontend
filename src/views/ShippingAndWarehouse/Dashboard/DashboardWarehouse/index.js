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

const DashboardWarehoue = () => {
  const [warehouse, setWarehouse] = useState('');
  return (
    <Grid container className="dashboard" direction="column">
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Warehouse"
          getData={apiGetTrucking}
          getDataDropdown={apiGetWarehouse}
          carouselName ="warehouse"
          dropdownLabel="Warehouse"
          enableDropdown
          dropdownVal={warehouse}
          setDropdownVal={setWarehouse}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="National Price"
          getData={apiGetTrucking}
          getDataDropdown={apiGetWarehouse}
          carouselName ="nationalprice"
          dropdownLabel="Warehouse"
          enableDropdown
          dropdownVal={warehouse}
          setDropdownVal={setWarehouse}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Ini Apa??"
          getData={apiGetTrucking}
          getDataDropdown={apiGetWarehouse}
          carouselName ="nationalprice"
          dropdownLabel="Warehouse"
          enableDropdown
          dropdownVal={warehouse}
          setDropdownVal={setWarehouse}/>
      </Grid>
    </Grid>
  );
};

export default DashboardWarehoue;
