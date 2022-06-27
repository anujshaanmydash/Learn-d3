import React, { useRef, useEffect } from 'react';
import { useResizeObserver } from '../../hooks/resizeObserver';

const CompareValueChart = () => {
  const wrapperSvg = useRef(null);
  const selectedSvg = useRef(null);
  const dimension = useResizeObserver(wrapperSvg);

  useEffect(() => {});

  return (
    <div ref={wrapperSvg}>
      <svg ref={selectedSvg}></svg>
    </div>
  );
};

export default CompareValueChart;
