// Import Library
import React from 'react';
import { Grid } from '@material-ui/core';

// Import views
import FactoryProduction from './FactoryProduction';
import OutsourceProduction from './OutsourceProduction';

// Import styling
import '../../../styles/views/dashboard.scss';

const Dashboard = () => {
  return (
    <Grid container className="dashboard" direction="column">
      <FactoryProduction />
      <OutsourceProduction />
    </Grid>
  );
};

export default Dashboard;
