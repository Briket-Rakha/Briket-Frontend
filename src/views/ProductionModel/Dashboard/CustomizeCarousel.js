
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


const CarouselView = (props) => {
  const { title, enableDropdown, dropdownLabel,
    getData, getDataDropdown, carouselName, addition } = props;
  const [dropdownVal, setDropdownVal] = useState(null);
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
              value={dropdownVal}
              label={dropdownLabel}
              getValues={getDataDropdown}
              setValue={setDropdownVal}
              size="small"
            />
          </Grid>
        }
      </Grid>

      <Grid
        item
        container
        className="dashboard-section-carousel"
        direction="column"
      >
        {enableDropdown ?
          <CustomCarousel
            getData={getData}
            parentID={dropdownVal}
            haveParent
            addition={addition}/> :
          <CustomCarousel getData={getData}/>
        }
        <Button
          className="align-end btn dashboard-section-btn"
          onClick={handleModalTanggal}
        >
          DOWNLOAD
        </Button>
        <CustomModal open={openTanggal} setOpen={setOpenTanggal}>
          <PilihTanggal downloadName={carouselName}/>
        </CustomModal>
      </Grid>
    </Grid>
  );
};

CarouselView.defaultProps = {
  title: '',
  enableDropdown: false,
  carouselName: '',
  addition: false,
  dropdownLabel: '',
  getDataDropdown: '',
};

CarouselView.propTypes = {
  title: PropTypes.string,
  enableDropdown: PropTypes.bool,
  getData: PropTypes.func.isRequired,
  getDataDropdown: PropTypes.func,
  dropdownLabel: PropTypes.string,
  carouselName: PropTypes.string.isRequired,
  addition: PropTypes.bool,
};

export default CarouselView;
