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
          title=""
          getData={apiGetTrucking}
          getDataDropdown={apiGetWarehouse}
          carouselName ="packaging"
          dropdownLabel="Warehouse"
          enableDropdown
          dropdownVal={warehouse}
          setDropdownVal={setWarehouse}
          addition/>
      </Grid>
    </Grid>
  );
};

export default DashboardWarehoue;
