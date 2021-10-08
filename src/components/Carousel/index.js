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

// Import Utils
import { formatCurrency, numberWithDots } from '../../utils/helper';

const CustomCarousel = (props) => {
  const { getData, parentID, haveParent, customResponse, carouselName } = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [dataCarousel, setDataCarousel] = useState([]);
  const isPrice = carouselName=='nationalprice' ? true : false;

  const getElements = (carouselName, i) => {
    let result;
    carouselName =='material' ? result = [dataCarousel[i].name]:
    carouselName =='hasilproduksi' ? result = [dataCarousel[i].name, dataCarousel[i].asal]:
    carouselName =='packaging'? result = [dataCarousel[i].name, dataCarousel[i].asal, dataCarousel[i].package_name]:
    carouselName =='warehouse'? result = [dataCarousel[i].name, dataCarousel[i].package]:
    carouselName =='shipping'?
    result =
    [
      dataCarousel[i].name,
      dataCarousel[i].asal,
      dataCarousel[i].package_name,
    ]:
    carouselName =='nationalprice'?
    result =
    [
      dataCarousel[i].name,
    ]:
    result = [];

    return result;
  };

  // carousel data getter
  const getDataCarousel = async () => {
    if (!loading) {
      setLoading(true);
      await ( haveParent ? getData(parentID) : getData() )
          .then((res) => {
            const { response: { data } } = res;
            if ( customResponse ) {
              setDataCarousel(data.result.data);
              setLoading(false);
              return (data.result.data);
            } else {
              setDataCarousel(data.data);
              setLoading(false);
              return (data.data);
            }
          })
          .catch((err) => {
            setErrorMessage(err?.message ? err.message : 'Server Error');
            setLoading(false);
          });
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
              infix={isPrice ? '' : 'kg'}
              total={isPrice ? formatCurrency(dataCarousel[i].national_price) : numberWithDots(dataCarousel[i].total)}
              elements={getElements(carouselName, i)}/>
            {i+1 < dataCarousel.length &&
                  <CarouselCard
                    key={i+1}
                    infix={isPrice ? '' : 'kg'}
                    total={
                      isPrice ?
                      formatCurrency(dataCarousel[i+1].national_price) : numberWithDots(dataCarousel[i+1].total)
                    }
                    elements={getElements(carouselName, i+1)}/>
            }
            {i+2 < dataCarousel.length &&
                  <CarouselCard
                    key={i+2}
                    infix={isPrice ? '' : 'kg'}
                    total={
                      isPrice ?
                      formatCurrency(dataCarousel[i+2].national_price) : numberWithDots(dataCarousel[i+2].total)
                    }
                    elements={getElements(carouselName, i+2)}/>
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
  customResponse: false,
  carouselName: '',
};

CustomCarousel.propTypes = {
  dataCarousel: PropTypes.any,
  getData: PropTypes.any.isRequired,
  carouselName: PropTypes.string.isRequired,
  customResponse: PropTypes.bool,
  parentID: PropTypes.any,
  haveParent: PropTypes.bool,
  addition: PropTypes.bool,
};

export default CustomCarousel;
