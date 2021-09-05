
// Import Library
import React from 'react';
import PropTypes from 'prop-types';

// Import styling
import '../../styles/components/carousel-card.scss';

const CarouselCard = (props) => {
  const { total, infix, elements } = props;
  return (
    <div className="carousel-card">
      <h1>{`${total} ${infix}`}</h1>
      {elements.map((el, idx) => (
        <p key={idx}>{el}</p>
      ))}
    </div>
  );
};

CarouselCard.defaultProps = {
  total: 0,
  infix: '',
  elements: [],
};

CarouselCard.propTypes = {
  total: PropTypes.number,
  infix: PropTypes.string,
  elements: PropTypes.array,
};


export default CarouselCard;
