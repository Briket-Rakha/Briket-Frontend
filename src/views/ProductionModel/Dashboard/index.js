// Import Library
import { React, useState } from 'react';
import { Grid } from '@material-ui/core';

// Import views
import FactoryProduction from './FactoryProduction';
import CustomizeCarousel from './CustomizeCarousel';
import OutsourceProduction from './OutsourceProduction';

// Import styling
import '../../../styles/views/dashboard.scss';

// Import API
import { apiGetMaterialDashboard } from '../../../api/material.api';
import { apiGetInputPackaging,
  apiGetContainer } from '../../../api/input-packaging.api';
import { apiGetHasilDashboard } from '../../../api/hasil-produksi.api';
import { apiGetPabrik } from '../../../api/pabrik.api';

const Dashboard = () => {
  const [pabrik, setPabrik] = useState('');
  const [container, setContainer] = useState('');

  const downloadCategory = [
    {
      id: 'hasilproduksi',
      name: 'Factory Production',
    },
    {
      id: 'outsource',
      name: 'Outsource Production',
    },
  ];

  return (
    <Grid container className="dashboard" direction="column">
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Material"
          getData={apiGetMaterialDashboard}
          getDataDropdown={apiGetPabrik}
          carouselName ="material"
          dropdownLabel="Pabrik"
          dropdownVal={pabrik}
          setDropdownVal={setPabrik}
          enableDropdown/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Factory and Outsource Production"
          carouselName ="hasilproduksi"
          getData={apiGetHasilDashboard}
          downloadCategory={downloadCategory}/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <CustomizeCarousel
          title="Packaging"
          getData={apiGetInputPackaging}
          getDataDropdown={apiGetContainer}
          carouselName ="packaging"
          dropdownLabel="Container"
          enableDropdown
          dropdownVal={container}
          setDropdownVal={setContainer}
          addition/>
      </Grid>
      <FactoryProduction />
      <OutsourceProduction />
    </Grid>
  );
};

export default Dashboard;
