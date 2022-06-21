import React, { useState, useRef, useEffect } from 'react';
import { useResizeObserver } from '../../hooks/resizeObserver';
import { scaleBand, select, axisBottom, scaleLinear, axisLeft } from 'd3';

const BarChar3 = () => {
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);
  const wrapperSvg = useRef();
  const selectedSvg = useRef();
  const dimension = useResizeObserver(wrapperSvg);
  const margin = { top: 10, right: 10, left: 50, bottom: 50 };

  const drawBarChart = () => {
    const chartWidth = dimension.width - margin.left - margin.right;
    const chartHeight = dimension.height - margin.top - margin.bottom;
    const svg = select(selectedSvg.current);

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, chartWidth - 50])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([chartHeight, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);
    console.log(chartHeight);
    svg
      .select('.x-axis')
      .attr('transform', `translate(50,${chartHeight})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select('.y-axis').attr('transform', `translate(50,0)`).call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')

      .style('transform', 'scale(1, -1)')
      .attr('x', (value, index) => xScale(index) + 50)
      .attr('y', -chartHeight)
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('fill', colorScale)
      .attr('height', (value) => chartHeight - yScale(value));
  };

  useEffect(() => {
    if (!dimension) {
      return;
    }

    drawBarChart();

    //eslint-disable-next-line
  }, [data, dimension]);

  return (
    <div ref={wrapperSvg} style={{ width: '100%', minHeight: '500px' }}>
      <svg ref={selectedSvg} style={{ width: '100%', minHeight: '500px' }}>
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
      <button
        onClick={() => setData(data.map((value) => value + 5))}
        style={{ padding: '10px', marginLeft: '50px', cursor: 'pointer' }}
      >
        Increase data
      </button>
      <button
        onClick={() => setData(data.filter((value) => value < 140))}
        style={{ padding: '10px', margin: '0 10px', cursor: 'pointer' }}
      >
        Filter bar whose value more thatn 140
      </button>
    </div>
  );
};

export default BarChar3;
