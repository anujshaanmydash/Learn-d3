import React, { useState } from 'react';
import ZoomableLineChart from '../../components/ZoomableLineChart';

const ZoomLineChart = () => {
  const [data, setData] = useState(
    Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  );

  return (
    <>
      <h2>Zoomable Line Chart</h2>
      <ZoomableLineChart data={data} />
      <button
        onClick={() => setData([...data, Math.random() * 100])}
        style={{ marginTop: '40px' }}
      >
        Add Data
      </button>
    </>
  );
};

export default ZoomLineChart;
