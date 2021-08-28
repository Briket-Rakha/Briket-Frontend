// Import Library
import React from 'react';
import { Grid } from '@material-ui/core';

// Import views
import CustomizeCarousel from '../../../ProductionModel/Dashboard/CustomizeCarousel';

// Import styling
import '../../../../styles/views/dashboard.scss';

// Import API
import { apiGetInputPackaging,
  apiGetContainer } from '../../../../api/input-packaging.api';

const DashboardWarehoue = () => {
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
    </Grid>
  );
};

export default DashboardWarehoue;
