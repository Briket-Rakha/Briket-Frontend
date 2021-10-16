
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
    getData, getDataDropdown, carouselName,
    dropdownVal, setDropdownVal, customResponse, downloadCategory,
    enableDownload, carouselFields } = props;
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
          container
          className="dashboard-section-header-title"
          direction="column"
        >
          <h3>{title}</h3>
        </Grid>
        <Grid container className="dashboard-section-header-input">
          {enableDropdown && dropdownLabel.map((el, idx) => {
            return (
              <CustomSelect
                key={idx}
                value={dropdownVal[idx]}
                label={dropdownLabel[idx]}
                getValues={getDataDropdown[idx]}
                setValue={setDropdownVal[idx]}
                size="small"
              />
            );
          })
          }
        </Grid>
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
            carouselName={carouselName}
            customResponse={customResponse}
            carouselFields={carouselFields}/> :
          <CustomCarousel
            getData={getData}
            customResponse={customResponse}
            carouselName={carouselName}
            carouselFields={carouselFields}/>
        }
        {
          enableDownload &&
          <Button
            className="align-end btn dashboard-section-btn"
            onClick={handleModalTanggal}
          >
            DOWNLOAD
          </Button>
        }
        <CustomModal open={openTanggal} setOpen={setOpenTanggal}>
          {
            downloadCategory ?
            <PilihTanggal downloadName={carouselName} dropdownAddition={downloadCategory}/> :
            <PilihTanggal downloadName={carouselName}/>
          }
        </CustomModal>
      </Grid>
    </Grid>
  );
};

CarouselView.defaultProps = {
  title: '',
  enableDropdown: false,
  carouselName: '',
  dropdownLabel: [],
  customResponse: false,
  getDataDropdown: () => {},
  setDropdownVal: [],
  enableDownload: false,
  carouselFields: [],
};

CarouselView.propTypes = {
  title: PropTypes.string,
  enableDropdown: PropTypes.bool,
  getData: PropTypes.any.isRequired,
  customResponse: PropTypes.bool,
  getDataDropdown: PropTypes.array,
  dropdownLabel: PropTypes.array,
  carouselName: PropTypes.string.isRequired,
  dropdownVal: PropTypes.array,
  setDropdownVal: PropTypes.array,
  downloadCategory: PropTypes.array,
  enableDownload: PropTypes.bool,
  carouselFields: PropTypes.array.isRequired,
};

export default CarouselView;
