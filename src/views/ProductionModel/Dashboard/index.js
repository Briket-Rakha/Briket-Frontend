// Import Library
import React from 'react';
import { Grid } from '@material-ui/core';

// Import views
import FactoryProduction from './FactoryProduction';

// Import styling
import '../../../styles/views/dashboard.scss';

const Dashboard = () => {
  return (
    <Grid container className="dashboard" direction="column">
      <FactoryProduction />
    </Grid>
  );
};

export default Dashboard;
