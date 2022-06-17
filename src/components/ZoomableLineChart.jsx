import {
  axisBottom,
  axisLeft,
  curveCardinal,
  line,
  max,
  scaleLinear,
  select,
  zoom,
  zoomTransform,
} from 'd3';
import React, { useRef, useEffect, useState } from 'react';
import { useResizeObserver } from '../hooks/resizeObserver';

const ZoomableLineChart = ({ data, id = 'myZooomableLineChart' }) => {
  const wrapperSvg = useRef();
  const selectedSvg = useRef();
  const dimension = useResizeObserver(wrapperSvg);
  const [currentZoomState, setCurrentZoomState] = useState();

  const drawLineChart = () => {
    const { width, height } = dimension;
    const svg = select(selectedSvg.current);
    const svgContent = svg.select('.content');

    const x = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width - 10]);

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(x);
      x.domain(newXScale.domain());
    }

    const y = scaleLinear()
      .domain([0, max(data)])
      .range([height - 10, 10]);

    const lineGenerator = line()
      .x((d, i) => x(i))
      .y((d) => y(d))
      .curve(curveCardinal);

    svgContent
      .selectAll('.myLine')
      .data([data])
      .join('path')
      .attr('class', 'myLine')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', lineGenerator);

    svgContent
      .selectAll('.myDot')
      .data(data)
      .join('circle')
      .attr('class', 'myDot')
      .attr('stroke', 'black')
      .attr('r', 4)
      .attr('fill', 'red')
      .attr('cx', (value, index) => x(index))
      .attr('cy', y);

    const xAxes = axisBottom(x);
    svg
      .select('.x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxes);

    const yAxes = axisLeft(y);
    svg.select('.y-axis').attr('transform', `translate(0,0)`).call(yAxes);

    const zoomBehaviour = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', () => {
        const zoomState = zoomTransform(selectedSvg.current);
        setCurrentZoomState(zoomState);
      });

    svg.call(zoomBehaviour);
  };
  useEffect(() => {
    if (!dimension) {
      return;
    }
    drawLineChart();
    //eslint-disable-next-line
  }, [currentZoomState, data, dimension]);

  return (
    <div ref={wrapperSvg} style={{ width: '100%', minHeight: '450px' }}>
      <svg
        ref={selectedSvg}
        style={{
          width: '100%',
          minHeight: '450px',
          background: '#e5e5e5',
          overflow: 'visible',
        }}
      >
        <defs>
          <clipPath id={id}>
            <rect x='0' y='0' width='100%' height='100%' />
          </clipPath>
        </defs>
        <g className='content' clipPath={`url(#${id})`}></g>
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
    </div>
  );
};

export default ZoomableLineChart;
