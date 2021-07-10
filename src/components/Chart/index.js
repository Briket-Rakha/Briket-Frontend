// Import Library
import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { dummySeries } from './dummySeries';

const CustomChart = (props) => {
  const { type, height, series, xtitle, ytitle } = props;

  // Chart Options
  const options= {
    chart: {
      type: 'bar',
      height: 320,
    },
    colors: [
      'rgba(40, 113, 148, 1)',
      'rgba(90, 230, 150, 1)',
      'rgba(255, 217, 54, 1)',
      'rgba(40, 113, 148, .6)',
      'rgba(90, 230, 150, .6)',
      'rgba(255, 217, 54, .6)',
      'rgba(40, 113, 148, .8)',
      'rgba(90, 230, 150, .8)',
      'rgba(255, 217, 54, .8)',
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    noData: {
      text: 'No Data',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: -44,
      style: {
        color: '#000',
        fontSize: '24px',
        fontFamily: 'Ubuntu',
      },
    },
    dataLabels: {
      enabled: false,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },
    stroke: {
      show: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 400,
          fontFamily: 'Ubuntu',
        },
      },
      title: {
        text: xtitle,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '13px',
          fontFamily: 'Ubuntu',
          fontWeight: 500,
          cssClass: 'apexcharts-xaxis-title',
        },
      },
    },
    title: {
      text: ytitle,
      align: 'left',
      margin: 0,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: 'Ubuntu',
        color: '#263238',
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      fontFamily: 'Ubuntu',
      fontWeight: 400,
      inverseOrder: false,
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 20,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };

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
  xtitle: '',
  ytitle: '',
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
  xtitle: PropTypes.string,
  ytitle: PropTypes.string,
};

export default CustomChart;
