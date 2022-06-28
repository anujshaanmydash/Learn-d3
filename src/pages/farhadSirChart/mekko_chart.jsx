import React from 'react';
import MosaicChart from '../../components/FarhadSirCharts/MosaicChart';

const data = [
  {
    month: 'Jan',
    darkBlue: 49,
    lightBlue: 33,
    yellow: 18,
  },
  {
    month: 'Feb',
    darkBlue: 51,
    lightBlue: 36,
    yellow: 13,
  },
  {
    month: 'Mar',
    darkBlue: 58,
    lightBlue: 26,
    yellow: 16,
  },
  {
    month: 'Apr',
    darkBlue: 52,
    lightBlue: 26,
    yellow: 12,
  },
  {
    month: 'May',
    darkBlue: 39,
    lightBlue: 26,
    yellow: 12,
  },
  {
    month: 'Jun',
    darkBlue: 52,
    lightBlue: 11,
    yellow: 12,
  },
  {
    month: 'Jul',
    darkBlue: 49,
    lightBlue: 11,
    yellow: 12,
  },
  {
    month: 'Aug',
    darkBlue: 14,
    lightBlue: 59,
    yellow: 27,
  },
  {
    month: 'Sep',
    darkBlue: 40,
    lightBlue: 32,
    yellow: 28,
  },
  {
    month: 'Oct',
    darkBlue: 49,
    lightBlue: 31,
    yellow: 20,
  },
  {
    month: 'Nov',
    darkBlue: 51,
    lightBlue: 37,
    yellow: 12,
  },
  {
    month: 'Dec',
    darkBlue: 54,
    lightBlue: 32,
    yellow: 14,
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
