// Import Library
import React from 'react';
import { Grid } from '@material-ui/core';

// Import views
import FactoryProduction from './FactoryProduction';
import CustomizeCarousel from './CustomizeCarousel';

// Import styling
import '../../../styles/views/dashboard.scss';

// Import API
import { apiGetMaterialDashboard } from '../../../api/material.api';
import { apiGetInputPackaging } from '../../../api/input-packaging.api';
import { apiGetHasilDashboard } from '../../../api/hasil-produksi.api';

const Dashboard = () => {
  return (
    <Grid container className="dashboard" direction="column">
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Material"
          getData={apiGetMaterialDashboard}
          enableDropdown/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Hasil Produksi"
          getData={apiGetHasilDashboard}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Packaging"
          getData={apiGetInputPackaging}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <FactoryProduction />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
