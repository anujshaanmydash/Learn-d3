import React from 'react';
import WaterFallChart from '../../components/FarhadSirCharts/WaterFallChart';

const data = [
  { name: 'Val2', val: 650000 },
  { name: 'Val3', val: 520000 },
  { name: 'Val4', val: 420000 },
  { name: 'Val5', val: 670000 },
  { name: 'Val6', val: 710000 },
  { name: 'Val7', val: 780000 },
  { name: 'Val8', val: 890000 },
  { name: 'Val9', val: 1030000 },
];

const WaterfallChart = () => {
  return (
    <>
      <WaterFallChart data={data} />
    </>
  );
};

export default WaterfallChart;
