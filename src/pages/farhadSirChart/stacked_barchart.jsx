import React from 'react';
import StackedBarChart from '../../components/FarhadSirCharts/StackedBarChart';

const data = [
  {
    year: 2010,
    darkBlue: 5,
    lightBlue: 1.3,
    yellow: 3.7,
  },
  {
    year: 2011,
    darkBlue: 4.7,
    lightBlue: 1.65,
    yellow: 3.65,
  },
  {
    year: 2012,
    darkBlue: 4.5,
    lightBlue: 1.9,
    yellow: 3.6,
  },
  {
    year: 2013,
    darkBlue: 4.2,
    lightBlue: 2.25,
    yellow: 3.55,
  },
  {
    year: 2014,
    darkBlue: 4,
    lightBlue: 2.5,
    yellow: 3.5,
  },
  {
    year: 2015,
    darkBlue: 3.8,
    lightBlue: 2.75,
    yellow: 3.45,
  },
  {
    year: 2016,
    darkBlue: 3.5,
    lightBlue: 3.1,
    yellow: 3.4,
  },
  {
    year: 2017,
    darkBlue: 3.2,
    lightBlue: 3.45,
    yellow: 3.35,
  },
  {
    year: 2018,
    darkBlue: 3,
    lightBlue: 3.7,
    yellow: 3.3,
  },
  {
    year: 2019,
    darkBlue: 2.7,
    lightBlue: 4.05,
    yellow: 3.25,
  },
  {
    year: 2020,
    darkBlue: 2.5,
    lightBlue: 4.3,
    yellow: 3.2,
  },
  {
    year: 2021,
    darkBlue: 2.2,
    lightBlue: 4.65,
    yellow: 3.15,
  },
  {
    year: 2022,
    darkBlue: 2,
    lightBlue: 4.9,
    yellow: 3.1,
  },
];

const StackBarChart = () => {
  return (
    <>
      <StackedBarChart data={data} />
    </>
  );
};

export default StackBarChart;
