
// Import Library
import React from 'react';
import PropTypes from 'prop-types';

// Import styling
import '../../styles/components/carousel-card.scss';

const CarouselCard = (props) => {
  const { total, name, asal, addition, infix } = props;
  return (
    <div className="carousel-card">
      <h1>{`${total} ${infix}`}</h1>
      <p>{name}</p>
      <p>{asal}</p>
      <p>{addition}</p>
    </div>
  );
};

CarouselCard.defaultProps = {
  total: 0,
  name: '',
  asal: '',
  addition: '',
  infix: '',
};

CarouselCard.propTypes = {
  total: PropTypes.number,
  name: PropTypes.string,
  asal: PropTypes.string,
  addition: PropTypes.string,
  infix: PropTypes.string,
};


export default CarouselCard;
