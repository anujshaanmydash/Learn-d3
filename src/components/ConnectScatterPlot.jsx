import {
  axisBottom,
  axisLeft,
  extent,
  line,
  scaleLinear,
  scaleTime,
  select,
  timeParse,
} from 'd3';
import React, { useRef, useEffect } from 'react';
import { useResizeObserver } from '../hooks/resizeObserver';

const ConnectScatterPlot = ({ data }) => {
  const wrapperSvg = useRef();
  const selectedSvg = useRef();
  const tooltip = useRef();
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
    const tooltipWrapper = select(tooltip.current);

    const formatTime = (tickValue) => timeParse('%Y-%m-%d')(tickValue);
    svg.selectAll('*').remove();

    svg
      .append('g')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const dateRange = extent(data, (d) => formatTime(d.date));
    data.forEach((d) => {
      return (d.value = +d.value);
    });

    const x = scaleTime().domain(dateRange).range([0, chartWidth]);

    const y = scaleLinear().domain([8000, 9200]).range([chartHeight, 0]);

    const xAxes = axisBottom(x);
    const yAxes = axisLeft(y).ticks(6);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left},${chartHeight + 10})`)
      .call(xAxes);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},10)`)
      .call(yAxes);

    //add lines
    svg
      .append('path')
      .attr('transform', `translateY(10)`)
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#69b3a2')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        line()
          .x((d) => x(new Date(d.date)))
          .y((d) => y(d.value))
      );

    //add dots
    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(new Date(d.date)))
      .attr('cy', (d) => y(d.value))
      .attr('r', 5)
      .attr('fill', '#69b3a2')
      .on('mousemove', (event, d) => {
        tooltipWrapper
          .html(
            `
          <p style=" font-weight: 500; margin: 0;">Date: ${d.date}</p>
          <p style=" font-weight: 500; margin: 0;">Value: ${d.value}</p>
          `
          )
          .style('display', 'block');
        const tooltipDimension = tooltipWrapper.node().getBoundingClientRect();
        console.log(tooltipDimension);
        tooltipWrapper
          .style('top', y(d.value) + 10 + 'px')
          .style(
            'left',
            x(new Date(d.date)) - tooltipDimension.width / 3 + 140 + 'px'
          );
      })
      .on('mouseout', () => {
        tooltipWrapper.style('display', 'none');
      });
  };

  useEffect(() => {
    if (!dimension) {
      return;
    }
    drawBarChart();

    //eslint-disable-next-line
  }, [dimension, data]);
  return (
    <div ref={wrapperSvg} style={{ width: '100%', minHeight: '500px' }}>
      <div ref={tooltip} className='tooltip'></div>
      <svg
        ref={selectedSvg}
        style={{ width: '100%', minHeight: '500px', background: '#e5e5e5' }}
      ></svg>
    </div>
  );
};

export default ConnectScatterPlot;
