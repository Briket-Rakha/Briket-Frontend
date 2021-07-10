
// Import Library
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Component
import CustomCarousel from '../../../components/Carousel';
import CustomSelect from '../../../components/Select';
import CustomAlert from '../../../components/Alert';
import CustomModal from '../../../components/Modal';
import PilihTanggal from './PilihTanggal';

// Import API
import { apiGetPabrik } from '../../../api/pabrik.api';


const CarouselView = (props) => {
  const { title, enableDropdown, getData } = props;
  const [pabrik, setPabrik] = useState(1);
  const [openTanggal, setOpenTanggal] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handleModalTanggal = () => {
    setOpenTanggal(true);
  };

  return (
    <Grid container className="dashboard-section" direction="column">
      {Boolean(errorMessage) && (
        <CustomAlert
          type={'error'}
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}
      <Grid container className="dashboard-section-header">
        <Grid
          item xs={8}
          className="dashboard-section-header-title"
          direction="column"
        >
          <h3>{title}</h3>
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
        {enableDropdown ?
        <CustomCarousel getData={getData} parentID={pabrik}/> :
        <CustomCarousel getData={getData}/>
        }
      </Grid>
      <Button
        className="align-end btn dashboard-section-btn"
        onClick={handleModalTanggal}
      >
              DOWNLOAD
      </Button>
      <CustomModal open={openTanggal} setOpen={setOpenTanggal}>
        <PilihTanggal />
      </CustomModal>
    </Grid>
  );
};

CarouselView.defaultProps = {
  title: '',
  enableDropdown: false,
};

CarouselView.propTypes = {
  title: PropTypes.string,
  enableDropdown: PropTypes.bool,
  getData: PropTypes.func.isRequired,
};

export default CarouselView;
