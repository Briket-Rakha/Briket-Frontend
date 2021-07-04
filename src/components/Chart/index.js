// Import Library
import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

// Import Dummy
import { dummySeries, options } from './options';

const CustomChart = (props) => {
  const { type, height, series } = props;

  return (
    <Chart
      series={series.length ? series : dummySeries }
      options={options}
      type={type}
      height={height}
    />
  );
};

CustomChart.defaultProps = {
  height: 320,
  series: [],
};

CustomChart.propTypes = {
  height: PropTypes.number,
  type: PropTypes.string.isRequired,
  series: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        series: PropTypes.arrayOf(
            PropTypes.number,
        ),
      }),
  ),
};

export default CustomChart;
