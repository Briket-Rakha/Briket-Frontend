
// Import Library
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Component
import CustomCarousel from '../../../components/Carousel';
import CustomSelect from '../../../components/Select';

// Import API
import { apiGetPabrik } from '../../../api/pabrik.api';


const CarouselView = (props) => {
  const { judul, enableDropdown } = props;
  const [pabrik, setPabrik] = useState();

  const items = [
    {
      berat: '200 kg',
      nama: 'batok kelapa',
      asal: 'pabrik A',
    },
    {
      berat: '200 kg',
      nama: 'batok kelapa',
      asal: 'pabrik A',
    },
    {
      berat: '200 kg',
      nama: 'batok kelapa',
      asal: 'pabrik A',
    },
    {
      berat: '2000 kg',
      nama: 'batok kelapa',
      asal: 'pabrik A',
    },
    {
      berat: '2000 kg',
      nama: 'batok kelapa',
      asal: 'pabrik A',
    },
    {
      berat: '200 kg',
      nama: 'batok kelapa',
      asal: 'pabrik A',
    },
    {
      berat: '200 kg',
      nama: 'batok kelapa',
      asal: 'pabrik A',
    },
    {
      berat: '200 kg',
      nama: 'batok kelapa',
      asal: 'pabrik A',
    },
  ];

  return (
    <Grid container className="dashboard-section" direction="column">
      <Grid container className="dashboard-section-header">
        <Grid
          item xs={8}
          className="dashboard-section-header-title"
          direction="column"
        >
          <h3>{judul}</h3>
        </Grid>

        {enableDropdown &&
      <Grid item xs={4} className="dashboard-section-header-input">
        <CustomSelect
          value={pabrik}
          label="Pabrik"
          getValues={apiGetPabrik}
          setValue={setPabrik}
          size="small"
        />
      </Grid>
        }
      </Grid>

      <Grid item className="dashboard-section-carousel">
        <CustomCarousel carouselData={items}/>
      </Grid>
      <Button
        className="align-end btn dashboard-section-btn"
        onClick={console.log('haaaaa')}
      >
              DOWNLOAD
      </Button>
    </Grid>
  );
};

CarouselView.defaultProps = {
  judul: 'Default Title',
  enableDropdown: false,
};

CarouselView.propTypes = {
  judul: PropTypes.string,
  enableDropdown: PropTypes.bool,
};

export default CarouselView;
