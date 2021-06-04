import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const Loading = () => {
  return (
    <Backdrop open className="backdrop">
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loading;
