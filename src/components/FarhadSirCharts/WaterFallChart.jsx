import {
  axisBottom,
  axisLeft,
  format,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  select,
  stack,
} from 'd3';
import React, { useEffect, useRef } from 'react';
import { useResizeObserver } from '../../hooks/resizeObserver';

const WaterFallChart = ({ data }) => {
  const wrapperSvg = useRef(null);
  const selectedSvg = useRef(null);
  const dimension = useResizeObserver(wrapperSvg);
  const margin = { top: 10, bottom: 40, right: 10, left: 50 };
  const colors = ['#00008B', '#3A8CCB', '#FCB316'];

  const drawWaterFallChart = () => {
    const chartHeight = dimension.height - margin.top - margin.bottom;
    const chartWidth = dimension.width - margin.left - margin.right;
    const svg = select(selectedSvg.current);

    svg.selectAll('*').remove();

    const x = scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, chartWidth])
      .padding(0.2);

    const y = scaleLinear()
      .domain([0, 1])
      .range([chartHeight - 10, 0]);

    const xAxes = axisBottom(x).tickFormat('Val');
    const yAxes = axisLeft(y).ticks(5).tickFormat(format('~%'));

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left},${chartHeight})`)
      .call(xAxes);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},10)`)
      .call(yAxes);

    const yAxesGrid = axisLeft(y).tickSize(-chartWidth).tickFormat('').ticks(5);

    svg
      .append('g')
      .attr('class', 'y-axis-grid')
      .attr('transform', `translate(${margin.left},10)`)
      .attr('stroke-width', 0.1)
      .call(yAxesGrid);

    data.push({
      name: 'Start',
      start: 0,
      end: data[0].val,
      class: 'start',
    });

    // let cumulative = data.;
    // for (let i = 0; i < data.length; i++) {
    //   data[i].start = cumulative;
    //   cumulative += data[i].val;
    //   data[i].end = cumulative;
    // }

    data.push({
      name: 'End',
      start: 0,
      class: 'end',
    });

    data.forEach((d) => {
      console.log(d.name);
    });
  };

  useEffect(() => {
    if (!dimension) return;

    drawWaterFallChart();
    //eslint-disable-next-line
  }, [dimension, data]);

  return (
    <div ref={wrapperSvg}>
      <svg
        ref={selectedSvg}
        style={{ width: '100%', minHeight: '500px' }}
      ></svg>
    </div>
  );
};

export default WaterFallChart;
