// Import Library
import { React, useState } from 'react';
import { Grid } from '@material-ui/core';

// Import Component
import DashboardCarousel from '../../../components/DashboardCarousel';

// Import views
import FactoryProduction from './FactoryProduction';
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
        <DashboardCarousel
          title="Material"
          getData={pabrik ? (() => apiGetMaterialDashboard(pabrik)) : console.log}
          carouselName ="material"
          carouselFields={['name']}
          enableDropdown
          dropdownLabel={['Factory']}
          dropdownVal={[pabrik]}
          setDropdownVal={[setPabrik]}
          getDataDropdown={[apiGetPabrik]}
          customGetDataDropdown={[false]}
          enableDownload/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <DashboardCarousel
          title="Factory and Outsource Production"
          carouselName ="hasilproduksi"
          getData={apiGetHasilDashboard}
          downloadCategory={downloadCategory}
          carouselFields={['name', 'asal']}
          enableDownload/>
      </Grid>
      <Grid item className="dashboard-section-content">
        <DashboardCarousel
          title="Packaging"
          getData={container ? (() => apiGetInputPackaging({ container_number: container })) : null}
          carouselName ="packaging"
          carouselFields={['name', 'asal', 'package_name']}
          enableDropdown
          dropdownLabel={['Container']}
          getDataDropdown={[apiGetContainer]}
          dropdownVal={[container]}
          setDropdownVal={[setContainer]}
          customGetDataDropdown={[false]}
          enableDownload/>
      </Grid>
      <FactoryProduction />
      <OutsourceProduction />
    </Grid>
  );
};

export default Dashboard;
