import React from 'react';
import MosaicChart from '../../components/FarhadSirCharts/MosaicChart';

const data = [
  {
    month: 'Jan',
    darkBlue: 5,
    lightBlue: 1.3,
    yellow: 3.7,
  },
  {
    month: 'Feb',
    darkBlue: 4.5,
    lightBlue: 1.9,
    yellow: 3.6,
  },
  {
    month: 'Mar',
    darkBlue: 4.2,
    lightBlue: 2.25,
    yellow: 3.55,
  },
  {
    month: 'Apr',
    darkBlue: 4,
    lightBlue: 2.5,
    yellow: 3.5,
  },
  {
    month: 'May',
    darkBlue: 3.8,
    lightBlue: 2.75,
    yellow: 3.45,
  },
  {
    month: 'Jun',
    darkBlue: 3.5,
    lightBlue: 3.1,
    yellow: 3.4,
  },
  {
    month: 'Jul',
    darkBlue: 3.2,
    lightBlue: 3.45,
    yellow: 3.35,
  },
  {
    month: 'Aug',
    darkBlue: 3,
    lightBlue: 3.7,
    yellow: 3.3,
  },
  {
    month: 'Sep',
    darkBlue: 2.7,
    lightBlue: 4.05,
    yellow: 3.25,
  },
  {
    month: 'Oct',
    darkBlue: 2.5,
    lightBlue: 4.3,
    yellow: 3.2,
  },
  {
    month: 'Nov',
    darkBlue: 2.2,
    lightBlue: 4.65,
    yellow: 3.15,
  },
  {
    month: 'Dec',
    darkBlue: 2,
    lightBlue: 4.9,
    yellow: 3.1,
  },
];

const MekkoChart = () => {
  return (
    <>
      <MosaicChart data={data} />
    </>
  );
};

export default MekkoChart;
