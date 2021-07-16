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

// TODO: change dummy data to data from API
const CustomCarousel = (props) => {
  const { getData, parentID } = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [dataCarousel, setDataCarousel] = useState();

  // carousel data getter
  const getDataCarousel = async () => {
    if (!loading) {
      setLoading(true);
      await ( parentID ? getData(parentID) : getData() )
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
  };

  const dynamicVal = parentID ? [parentID] : [];
  useEffect(() => {
    getDataCarousel().then((data) => {
      if (data) {
        setDataCarousel(data);
      }
    });
  }, dynamicVal);

  const threeItemsRender = [];
  if (dataCarousel) {
    for (let i = 0; i < dataCarousel.length; i+=3) {
      threeItemsRender.push(
          <div className="carousel-wrapper">
            <CarouselCard
              key={i}
              total={dataCarousel[i].total}
              name={dataCarousel[i].name}
              asal={parentID ? '' : dataCarousel[i].asal}/>
            {i+1 < dataCarousel.length &&
                  <CarouselCard
                    key={i+1}
                    total={dataCarousel[i+1].total}
                    name={dataCarousel[i+1].name}
                    asal={parentID ? '' : dataCarousel[i].asal}/>
            }
            {i+2 < dataCarousel.length &&
                  <CarouselCard
                    key={i+2}
                    total={dataCarousel[i+2].total}
                    name={dataCarousel[i+2].name}
                    asal={parentID ? '' : dataCarousel[i].asal}/>
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
          <Carousel>
            {threeItemsRender}
          </Carousel>

      }
    </>
  );
};

CustomCarousel.defaultProps = {
  dataCarousel: [],
  parentID: '',
};

CustomCarousel.propTypes = {
  dataCarousel: PropTypes.any,
  getData: PropTypes.func.isRequired,
  parentID: PropTypes.any,
};

export default CustomCarousel;
