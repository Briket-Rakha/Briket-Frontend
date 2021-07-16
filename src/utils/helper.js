export const formatCurrency = (data) => {
  const datastring = data.toString().split('');
  const stringLength = datastring.length;

  return (
    `Rp. ${datastring.map((char, index) => {
      if (index > 0 && index % 3 === stringLength % 3) {
        return `.${char}`;
      }

      return char;
    }).join('')}`
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

