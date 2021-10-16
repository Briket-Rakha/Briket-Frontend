
// Import Library
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Component
import CustomCarousel from '../Carousel';
import CustomSelect from '../Select';
import CustomAlert from '../Alert';
import CustomModal from '../Modal';

// Import View
import PilihTanggal from '../../views/ProductionModel/Dashboard/PilihTanggal';


const DashboardCarousel = (props) => {
  const { title, enableDropdown, dropdownLabel,
    getData, getDataDropdown, carouselName,
    dropdownVal, setDropdownVal, downloadCategory,
    enableDownload, carouselFields, customGetDataDropdown } = props;
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
                constantValues={customGetDataDropdown[idx]}
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
            carouselFields={carouselFields}/> :
          <CustomCarousel
            getData={getData}
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

DashboardCarousel.defaultProps = {
  title: '',
  enableDropdown: false,
  carouselName: '',
  dropdownLabel: [],
  getDataDropdown: () => {},
  setDropdownVal: [],
  enableDownload: false,
  carouselFields: [],
  customGetDataDropdown: [],
};

DashboardCarousel.propTypes = {
  title: PropTypes.string,
  enableDropdown: PropTypes.bool,
  getData: PropTypes.any.isRequired,
  getDataDropdown: PropTypes.array,
  customGetDataDropdown: PropTypes.array,
  dropdownLabel: PropTypes.array,
  carouselName: PropTypes.string.isRequired,
  dropdownVal: PropTypes.array,
  setDropdownVal: PropTypes.array,
  downloadCategory: PropTypes.array,
  enableDownload: PropTypes.bool,
  carouselFields: PropTypes.array.isRequired,
};

export default DashboardCarousel;
