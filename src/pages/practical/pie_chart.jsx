import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const data = [
  { item: 'A', count: 403 },
  { item: 'B', count: 109 },
  { item: 'C', count: 273 },
  { item: 'D', count: 150 },
  { item: 'E', count: 253 },
];

const colors = ['#c8b6ff', '#ffd6ff', '#588157', '#ef476f', '#caf0f8'];

const PieChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const pieData = d3.pie().value((d) => d.count)(data);

    console.log(pieData);
    const arc = d3.arc().innerRadius(60).outerRadius(200);

    const colorData = d3.scaleOrdinal(colors);

    const svg = d3
      .select(chartRef.current)
      .attr('width', 1200)
      .attr('height', 500)
      .style('background-color', '#e5e5e5')
      .append('g')
      .attr('transform', 'translate(600,250)');

    const tooldiv = d3
      .select('#pie-chart')
      .append('div')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background', 'red');

    svg
      .append('g')
      .selectAll('path')
      .data(pieData)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colorData(i))
      .on('mouseover', (e, d) => {
        tooldiv
          .style('visibility', 'visible')
          .text(`${d.data.item}:` + `${d.data.count}`)
          .style('padding', '10px');
      })
      .on('mousemove', (e) => {
        tooldiv
          .style('top', e.pageY - 50 + 'px')
          .style('left', e.pageX - 50 + 'px');
      })
      .on('mouseout', () => {
        tooldiv.style('visibility', 'hidden');
      });
  });

  return (
    <div id='pie-chart'>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default PieChart;
