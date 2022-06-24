import React, { useState } from 'react';
import { useEffect } from 'react';
import GaugeChart from '../../components/FarhadSirCharts/SpeedDividedIndicator/GaugeChart';
import Legends from '../../components/FarhadSirCharts/SpeedDividedIndicator/Legends';
import classes from '../../styles/speedIndicator.module.scss';

const SpeedIndicator = () => {
  const [speed, setSpeed] = useState(0);

  const randomSpeed = () => {
    return (Math.random() * 5 + 0.1).toFixed(1);
  };

  const data = [
    {
      value: 'Poor',
      color: '#c30404',
    },
    {
      value: 'Developing',
      color: '#ff851a',
    },
    {
      value: 'Strong',
      color: '#ffc505',
    },
    {
      value: 'Excellent',
      color: '#25d00b',
    },
  ];

  const colorData = [
    { color: '#c30404', value: 5, label: 'Poor' },
    { color: '#ff851a', value: 1, label: 'Developing' },
    { color: '#ffc505', value: 2, label: 'Strong' },
    { color: '#25d00b', value: 2, label: 'Excellent' },
  ];

  useEffect(() => {
    const currentSpeed = randomSpeed();
    setSpeed(currentSpeed);
  }, []);

  return (
    <div className={classes.speed_indicator}>
      <p>Speed Indicator with sector and values</p>
      <div className={classes.speed_indicator__wrapper}>
        <p>{speed}</p>
        <div className={classes.gaugeWrapper}>
          <GaugeChart colorData={colorData} speed={speed} />
        </div>
        <div className={classes.legendWrapper}>
          <Legends data={data} />
        </div>
      </div>
    </div>
  );
};

export default SpeedIndicator;
