// Import Library
import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Component
import CarouselCard from './CarouselCard';
import CustomAlert from '../../components/Alert';

// Import styling
import '../../styles/components/carousel.scss';

const CustomCarousel = (props) => {
  const { getData, parentID, haveParent, getDataNonFunc, carouselName } = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [dataCarousel, setDataCarousel] = useState([]);

  // carousel data getter
  const getDataCarousel = async () => {
    if ( getDataNonFunc ) {
      setDataCarousel(getData);
      return (getData);
    } else {
      if (!loading) {
        setLoading(true);
        await ( haveParent ? getData(parentID) : getData() )
            .then((res) => {
              const { response: { data } } = res;
              setDataCarousel(data.data);
              setLoading(false);
              return (data.data);
            })
            .catch((err) => {
              setErrorMessage(err?.message ? err.message : 'Server Error');
              setLoading(false);
            });
      }
    }
  };

  const dynamicVal = haveParent ? [parentID] : [];
  useEffect(() => {
    if (!haveParent || (haveParent && parentID)) {
      getDataCarousel().then((data) => {
        if (data) {
          setDataCarousel(data);
        }
      });
    }
  }, dynamicVal);

  const threeItemsRender = [];
  if (dataCarousel) {
    for (let i = 0; i < dataCarousel.length; i+=3) {
      threeItemsRender.push(
          <div className="carousel-wrapper">
            <CarouselCard
              key={i}
              infix="kg"
              total={dataCarousel[i].total}
              elements={
                carouselName=='material' ? [dataCarousel[i].name]:
                carouselName=='hasilproduksi' ? [dataCarousel[i].name, dataCarousel[i].asal]:
                carouselName=='packaging'? [dataCarousel[i].name, dataCarousel[i].asal, dataCarousel[i].package_name]:
                carouselName=='warehouse'? [dataCarousel[i].container_number]:
                []
              }/>
            {i+1 < dataCarousel.length &&
                  <CarouselCard
                    key={i+1}
                    infix="kg"
                    total={dataCarousel[i+1].total}
                    elements={
                      carouselName=='material' ? [dataCarousel[i+1].name]:
                      carouselName=='hasilproduksi' ? [dataCarousel[i+1].name, dataCarousel[i+1].asal]:
                      carouselName=='packaging'?
                      [dataCarousel[i+1].name, dataCarousel[i+1].asal, dataCarousel[i+1].package_name]:
                      carouselName=='warehouse'? [dataCarousel[i+1].container_number]:
                      []
                    }/>
            }
            {i+2 < dataCarousel.length &&
                  <CarouselCard
                    key={i+2}
                    infix="kg"
                    total={dataCarousel[i+2].total}
                    elements={
                      carouselName=='material' ? [dataCarousel[i+2].name]:
                      carouselName=='hasilproduksi' ? [dataCarousel[i+2].name, dataCarousel[i+2].asal]:
                      carouselName=='packaging'?
                      [dataCarousel[i+2].name, dataCarousel[i+2].asal, dataCarousel[i+2].package_name]:
                      carouselName=='warehouse'? [dataCarousel[i+2].container_number]:
                      []
                    }/>
            }
          </div>,
      );
    }
  }


  return (
    <>
      {Boolean(errorMessage) && (
        <CustomAlert
          type={'error'}
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}

      {loading ?
          <Grid item className="loading-carousel">
            <CircularProgress size={60} thickness={6} />
          </Grid> :
          (
            dataCarousel.length>0?
            <Carousel>
              {threeItemsRender}
            </Carousel> : <p className="no-data">No Data Found!</p>
          )


      }
    </>
  );
};

CustomCarousel.defaultProps = {
  dataCarousel: [],
  parentID: '',
  haveParent: false,
  addition: false,
  getDataNonFunc: false,
  carouselName: '',
};

CustomCarousel.propTypes = {
  dataCarousel: PropTypes.any,
  getData: PropTypes.any.isRequired,
  carouselName: PropTypes.string.isRequired,
  getDataNonFunc: PropTypes.bool,
  parentID: PropTypes.any,
  haveParent: PropTypes.bool,
  addition: PropTypes.bool,
};

export default CustomCarousel;
