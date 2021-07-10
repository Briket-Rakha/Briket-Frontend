
// Import Library
import React from 'react';
import PropTypes from 'prop-types';

// Import styling
import '../../styles/components/carousel-card.scss';

const CarouselCard = (props) => {
  const { total, name, asal } = props;
  return (
    <div className="carousel-card">
      <h1>{total}</h1>
      <p>{name}</p>
      <p>{asal}</p>
    </div>
  );
};

CarouselCard.defaultProps = {
  total: 'Default total',
  name: 'Default name',
  asal: 'Default asal',
};

CarouselCard.propTypes = {
  total: PropTypes.any,
  name: PropTypes.any,
  asal: PropTypes.any,
};


export default CarouselCard;
