export const formatCurrency = (data, type) => {
  return (
    (Number(data || 0)).toLocaleString('en-US', {
      style: 'currency',
      currency: type,
    })
  );
};

import React from 'react';

const brokenStringImage = (
    e, url = `${process.env.PUBLIC_URL}/images/broken-image.png`,
) => {
  e.target.onerror = null;
  e.target.src = url;
  // e.target.onclick = null;
  return e;
};

export const purifyUrlString = (url) => {
  if (typeof url === 'string') {
    url = url.replaceAll(' ', '%20');

    return url.includes('http') ?
      url :
      `http://${url}`;
  }

  return url;
};

export const urlStringToImage = (string) => {
  return (
    <img
      width="100%"
      src={purifyUrlString(string)}
      alt="image"
      onError={brokenStringImage}
      onClick={() => window.open(purifyUrlString(string), '_blank')}
    />
  );
};

export const toSortedArray = (obj, keys) => {
  const array = [];
  keys.forEach(({ type, value }) => {
    if (type === 'image') {
      obj[value] = urlStringToImage(obj[value]);
    };

    if (type === 'date') {
      obj[value] = new Date(obj[value]).toUTCString();
    }

    array.push(obj[value]);
  });

  return array;
};

export const numberWithDots = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

