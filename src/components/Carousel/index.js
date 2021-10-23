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
  const { getData, parentID, haveParent, carouselName, carouselFields } = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currencyType, setCurrencyType] = useState('');

  const [dataCarousel, setDataCarousel] = useState([]);
  const isPrice = carouselName === 'nationalprice';

  const getElements = (i) => {
    const result = [];
    carouselFields.forEach(function(item) {
      result.push(dataCarousel[i][item]);
    });

    return result;
  };

  // carousel data getter
  const getDataCarousel = async () => {
    if (!loading) {
      setLoading(true);
      await ( getData() )
          .then((res) => {
            const data = res?.response?.data?.result || res?.response?.data || res?.data;
            setDataCarousel(data.data);
            setLoading(false);
            return data.data;
          })
          .catch((err) => {
            setErrorMessage(err?.message ? err.message : 'Server Error');
            setLoading(false);
          });
    }
  };

  let dynamicVal;
  if (Array.isArray(parentID)) {
    dynamicVal = parentID;
  } else {
    dynamicVal = haveParent ? [parentID] : [];
  }

  useEffect(() => {
    if (!haveParent || (haveParent && parentID[0])) {
      getDataCarousel().then((data) => {
        if (data) {
          setDataCarousel(data);
        }
      });
    }

    if (isPrice) {
      setCurrencyType(parentID[0]);
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
              total={isPrice ?
                formatCurrency(dataCarousel[i].national_price, currencyType) :
                numberWithDots(dataCarousel[i].total)}
              elements={getElements(i)}/>
            {i+1 < dataCarousel.length &&
                  <CarouselCard
                    key={i+1}
                    infix={isPrice ? '' : 'kg'}
                    total={
                      isPrice ?
                      formatCurrency(dataCarousel[i+1].national_price, currencyType) :
                      numberWithDots(dataCarousel[i+1].total)
                    }
                    elements={getElements(i+1)}/>
            }
            {i+2 < dataCarousel.length &&
                  <CarouselCard
                    key={i+2}
                    infix={isPrice ? '' : 'kg'}
                    total={
                      isPrice ?
                      formatCurrency(dataCarousel[i+2].national_price, currencyType) :
                      numberWithDots(dataCarousel[i+2].total)
                    }
                    elements={getElements(i+2)}/>
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
  parentID: [],
  haveParent: false,
  carouselName: '',
  carouselFields: [],
};

CustomCarousel.propTypes = {
  dataCarousel: PropTypes.any,
  getData: PropTypes.any.isRequired,
  carouselName: PropTypes.string.isRequired,
  parentID: PropTypes.array,
  haveParent: PropTypes.bool,
  carouselFields: PropTypes.array.isRequired,
};

export default CustomCarousel;
