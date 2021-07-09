// Import Library
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import PropTypes from 'prop-types';

// Import Component
import CarouselCard from './CarouselCard';

// Import styling
import '../../styles/components/carousel.scss';

// TODO: change dummy data to data from API
const CustomCarousel = (props) => {
  const { carouselData } = props;

  const threeItemsRender = [];
  for (let i = 0; i < carouselData.length; i+=3) {
    threeItemsRender.push(
        <div className="carousel-wrapper">
          <CarouselCard
            key={i}
            berat={carouselData[i].berat}
            nama={carouselData[i].nama}
            asal={carouselData[i].asal}/>
          {i+1 < carouselData.length &&
                <CarouselCard
                  key={i+1}
                  berat={carouselData[i+1].berat}
                  nama={carouselData[i+1].nama}
                  asal={carouselData[i+1].asal}/>
          }
          {i+2 < carouselData.length &&
                <CarouselCard
                  key={i+2}
                  berat={carouselData[i+2].berat}
                  nama={carouselData[i+2].nama}
                  asal={carouselData[i+2].asal}/>
          }
        </div>,
    );
  }

  return (
    <Carousel>
      {threeItemsRender}
    </Carousel>
  );
};

CustomCarousel.defaultProps = {
  carouselData: [],
};

CustomCarousel.propTypes = {
  carouselData: PropTypes.any,
};

export default CustomCarousel;
