import { select, timeParse } from 'd3';
import React, { useRef, useEffect } from 'react';
import { useResizeObserver } from '../hooks/resizeObserver';

const ConnectScatterPlot = ({ data }) => {
  const wrapperSvg = useRef();
  const selectedSvg = useRef();
  const dimension = useResizeObserver(wrapperSvg);
  const margin = {
    top: 20,
    bottom: 20,
    right: 20,
    left: 40,
  };

  const drawBarChart = () => {
    const chartWidth = dimension.width - margin.right - margin.left;
    const chartHeight = dimension.height - margin.top - margin.bottom;
    const svg = select(selectedSvg.current);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  };

  useEffect(() => {
    if (!dimension) {
      return;
    }
    drawBarChart();

    //eslint-disable-next-line
  }, [dimension, data]);
  return (
    <div ref={wrapperSvg} style={{ width: '100%', minHeight: '450px' }}>
      <svg
        ref={selectedSvg}
        style={{ width: '100%', minHeight: '450px', background: '#e5e5e5' }}
      ></svg>
    </div>
  );
};

export default ConnectScatterPlot;
