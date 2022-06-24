import React, { useState } from 'react';
import { useEffect } from 'react';
import GaugeChart from '../../components/FarhadSirCharts/SpeedIndicator/GaugeChart';

const SpeedIndicator = () => {
  const [speed, setSpeed] = useState(0);
  const randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

  useEffect(() => {
    const currentSpeed = randomNumber();
    setSpeed(currentSpeed);
  }, []);
  return (
    <div style={{ width: '100%', minHeight: '500px' }}>
      <h2>Speed Indicator</h2>
      <GaugeChart speed={speed} />
    </div>
  );
};

export default SpeedIndicator;
