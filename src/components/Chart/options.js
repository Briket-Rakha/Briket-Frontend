export const dummySeries = [
  {
    name: 'serie1',
    data: [44, 55, 41, 64],
  },
  {
    name: 'serie2',

    data: [53, 32, 33, 52],
  },
  {
    name: 'series3',

    data: [23, 62, 13, 72],
  },
  {
    name: 'series4',

    data: [63, 44, 26, 62],
  },
];

export const options= {
  chart: {
    type: 'bar',
    height: 300,
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
