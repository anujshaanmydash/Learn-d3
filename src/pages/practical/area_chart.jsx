import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { year: '2017', count: 50 },
  { year: '2018', count: 60 },
  { year: '2019', count: 120 },
  { year: '2020', count: 90 },
  { year: '2021', count: 110 },
];

const AreaChart = () => {
  const areaRef = useRef();
  const dimension = {
    width: 1100,
    height: 500,
  };
  useEffect(() => {
    //wrapper svg
    const svg = d3
      .select(areaRef.current)
      .attr('width', dimension.width)
      .attr('height', dimension.height)
      .style('background-color', '#e5e5e5');

    //xScale
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d3.timeParse('%Y')(d.year)))
      .range([0, dimension.width - 100]);

    //grouping xScale with xAxes
    svg
      .append('g')
      .call(d3.axisBottom(x))
      .attr('transform', 'translate(30,450)');

    //yScale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .range([dimension.height - 100, 0]);

    //grouping yScale with yAxes
    svg.append('g').call(d3.axisLeft(y)).attr('transform', 'translate(30,50)');

    //area chart
    const area = d3
      .area()
      .x((d) => x(d3.timeParse('%Y')(d.year)))
      .y0(y(0))
      .y1((d) => y(d.count));

    svg
      .append('path')
      .datum(data)
      .attr('d', area)
      .attr('transform', 'translate(30,50)')
      .attr('fill', '#f25cb4')
      .attr('stroke', '#c70469')
      .attr('stroke-width', 2);
  });

  return (
    <div>
      <svg ref={areaRef}></svg>
    </div>
  );
};

export default AreaChart;
