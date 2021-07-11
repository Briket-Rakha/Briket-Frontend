
// Import Library
import React from 'react';
import PropTypes from 'prop-types';

// Import styling
import '../../styles/components/carousel-card.scss';

const CarouselCard = (props) => {
  const { total, name, asal } = props;
  console.log(props);
  return (
    <div className="carousel-card">
      <h1>{total}</h1>
      <p>{name}</p>
      <p>{asal}</p>
    </div>
  );
};

CarouselCard.defaultProps = {
  total: 0,
  name: '',
  asal: '',
};

CarouselCard.propTypes = {
  total: PropTypes.number,
  name: PropTypes.string,
  asal: PropTypes.string,
};


export default CarouselCard;
