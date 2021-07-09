// Import Library
import React from 'react';
import { Grid } from '@material-ui/core';

// Import views
import FactoryProduction from './FactoryProduction';
import CustomizeCarousel from './CustomizeCarousel';

// Import styling
import '../../../styles/views/dashboard.scss';

const Dashboard = () => {
  return (
    <Grid container className="dashboard" direction="column">
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel judul="Material" enableDropdown/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel judul="Hasil Produksi"/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel judul="Packaging"/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <FactoryProduction />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
