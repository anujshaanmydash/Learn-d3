import {
  axisBottom,
  axisLeft,
  curveBumpX,
  line,
  scaleLinear,
  scalePoint,
  select,
} from 'd3';
import React, { useEffect, useRef } from 'react';
import { useResizeObserver } from '../../hooks/resizeObserver';

const data1 = [
  { month: 'Set 1', value: '18' },
  { month: 'Set 2', value: '12' },
  { month: 'Set 3', value: '6' },
  { month: 'Set 4', value: '9' },
  { month: 'Set 5', value: '19' },
  { month: 'Set 6', value: '15' },
  { month: 'Set 7', value: '10' },
  { month: 'Set 8', value: '11' },
];
const data2 = [
  { month: 'Set 1', value: '6' },
  { month: 'Set 2', value: '12' },
  { month: 'Set 3', value: '17' },
  { month: 'Set 4', value: '10' },
  { month: 'Set 5', value: '5' },
  { month: 'Set 6', value: '7' },
  { month: 'Set 7', value: '4' },
  { month: 'Set 8', value: '6' },
];

const CompareValueChart = () => {
  const wrapperSvg = useRef(null);
  const selectedSvg = useRef(null);
  const dimension = useResizeObserver(wrapperSvg);
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };

  const drawLineChart = () => {
    const chartWidth = dimension.width;
    const chartHeight = dimension.height;
    const svg = select(selectedSvg.current);

    svg.selectAll('*').remove();

    const g = svg
      .append('g')
      .attr('width', chartWidth - margin.right - margin.left)
      .attr('height', chartHeight - margin.top - margin.bottom);

    const x = scalePoint()
      .domain(data1.map((d) => d.month))
      .range([0, chartWidth - 100])
      .padding(0.5);
    const y = scaleLinear()
      .domain([0, 20])
      .range([chartHeight - 20, 0]);

    const months = data1.map((d) => {
      return d.month;
    });
    console.log(months);

    const xAxes = axisBottom(x).tickSize(0);
    const yAxes = axisLeft(y).ticks(10).tickSize(0);

    const yAxisGrid = axisLeft(y).tickSize(-chartWidth).ticks(10);
    const xAxisGrid = axisBottom(x).tickSize(-chartHeight);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left},${chartHeight - 20})`)
      .call(xAxes);

    g.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxes);

    g.append('g')
      .attr('class', 'y-axis-grid')
      .call(yAxisGrid)
      .attr('transform', `translate(50,0)`)
      .attr('stroke-width', 0.2);

    g.append('g')
      .attr('class', 'x-axis-grid')
      .call(xAxisGrid)
      .attr('transform', `translate(50,${chartHeight - 20})`)
      .attr('stroke-width', 0.2);

    //first data line
    svg
      .append('path')
      .attr('transform', `translate(50,0)`)
      .datum(data1)
      .attr('fill', 'none')
      .attr('stroke', '#FBAA19')
      .attr('stroke-width', '2')
      .attr(
        'd',
        line()
          .x((d) => x(d.month))
          .y((d) => y(d.value))
          .curve(curveBumpX)
      );

    //second data line
    svg
      .append('path')
      .attr('transform', `translate(50,0)`)
      .datum(data2)
      .attr('fill', 'none')
      .attr('stroke', '#3A8CCB')
      .attr('stroke-width', '2')
      .attr(
        'd',
        line()
          .x((d) => x(d.month))
          .y((d) => y(d.value))
          .curve(curveBumpX)
      );

    const firstDotRadius = (d) => {
      return data1[d].value < data2[d].value ? 5 : 3;
    };
    const secondDotRadius = (d) => {
      return data1[d].value > data2[d].value ? 5 : 3;
    };

    //first data dot
    svg
      .append('g')
      .attr('transform', `translate(50,0)`)
      .selectAll('dot')
      .data(data1)
      .join('circle')
      .attr('cx', (d) => x(d.month))
      .attr('cy', (d) => y(d.value))
      .attr('r', (d, i) => firstDotRadius(i))
      .attr('fill', '#FBAA19');

    //second data dot
    svg
      .append('g')
      .attr('transform', `translate(50,0)`)
      .selectAll('dot')
      .data(data2)
      .join('circle')
      .attr('cx', (d) => x(d.month))
      .attr('cy', (d) => y(d.value))
      .attr('r', (d, i) => secondDotRadius(i))
      .attr('fill', '#3A8CCB');
  };

  useEffect(() => {
    if (!dimension) return;

    drawLineChart();
    //eslint-disable-next-line
  }, [dimension]);

  return (
    <div ref={wrapperSvg} style={{ minHeight: '500px' }}>
      <svg ref={selectedSvg} style={{ width: '100%', height: '500px' }}></svg>
    </div>
  );
};

export default CompareValueChart;
