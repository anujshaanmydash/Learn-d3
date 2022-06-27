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

const StackedBarChart = ({ data }) => {
  const wrapperSvg = useRef(null);
  const selectedSvg = useRef(null);
  const dimension = useResizeObserver(wrapperSvg);
  const margin = { top: 10, bottom: 40, right: 10, left: 50 };
  const colors = ['#00008B', '#3A8CCB', '#FCB316'];

  const drawStackedBarChart = () => {
    const chartHeight = dimension.height - margin.top - margin.bottom;
    const chartWidth = dimension.width - margin.left - margin.right;
    const svg = select(selectedSvg.current);

    svg.selectAll('*').remove();

    const x = scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, chartWidth])
      .padding(0.2);

    const y = scaleLinear()
      .domain([0, 1])
      .range([chartHeight - 10, 0]);

    const xAxes = axisBottom(x).tickFormat('val');
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

    const subgroup = Object.keys(data[0]).slice(1);

    const color = scaleOrdinal().domain(subgroup).range(colors);

    console.log(data);

    data.forEach((d) => {
      let tot = 0;
      for (let i in subgroup) {
        let name = subgroup[i];
        tot += +d[name];
      }
      for (let i in subgroup) {
        let name = subgroup[i];
        d[name] = (d[name] / tot) * 1;
      }
    });

    const stackGenerator = stack().keys(subgroup)(data);

    console.log(data);
    svg
      .append('g')
      .attr('transform', `translate(${50},10)`)
      .selectAll('g')
      .data(stackGenerator)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (sequence) => x(sequence.data.year))
      .attr('y', (sequence) => y(sequence[1]))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(d[0]) - y(d[1]) - 1)
      .attr('stroke', '#eee');
  };

  useEffect(() => {
    if (!dimension) return;

    drawStackedBarChart();
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

export default StackedBarChart;
