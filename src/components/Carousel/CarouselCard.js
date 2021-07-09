
// Import Library
import React from 'react';
import PropTypes from 'prop-types';

// Import styling
import '../../styles/components/carousel-card.scss';

const CarouselCard = (props) => {
  const { berat, nama, asal } = props;
  return (
    <div className="carousel-card">
      <h1>{berat}</h1>
      <p>{nama}</p>
      <p>{asal}</p>
    </div>
  );
};

CarouselCard.defaultProps = {
  berat: 'Default Berat',
  nama: 'Default Nama',
  asal: 'Default Asal',
};

CarouselCard.propTypes = {
  berat: PropTypes.any,
  nama: PropTypes.any,
  asal: PropTypes.any,
};


export default CarouselCard;
