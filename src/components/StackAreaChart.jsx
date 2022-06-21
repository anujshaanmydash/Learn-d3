import {
  axisBottom,
  axisLeft,
  max,
  scaleLinear,
  select,
  stack,
  stackOrderAscending,
  area,
  scalePoint,
  curveCardinal,
} from 'd3';
import React, { useRef, useEffect } from 'react';
import { useResizeObserver } from '../hooks/resizeObserver';

const StackAreaChart = ({ data, keys, colors }) => {
  const wrapperSvg = useRef();
  const selectedSvg = useRef();
  const dimension = useResizeObserver(wrapperSvg);

  const drawAreaChart = () => {
    const height = dimension.height;
    const width = dimension.width;
    const svg = select(selectedSvg.current);

    svg.selectAll('*').remove();

    const stackGenerator = stack().keys(keys).order(stackOrderAscending);
    const layers = stackGenerator(data);

    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    const x = scalePoint()
      .domain(data.map((d) => d.year))
      .range([30, width]);

    const y = scaleLinear()
      .domain(extent)
      .range([height - 30, 20]);

    const xAxes = axisBottom(x);
    const yAxes = axisLeft(y);

    svg
      .append('g')
      .attr('class', '.x-axis')
      .attr('transform', `translate(0,${height - 30})`)
      .call(xAxes);

    svg
      .append('g')
      .attr('class', '.y-axis')
      .attr('transform', `translate(30,0)`)
      .call(yAxes);

    const areaGenerator = area()
      .x((sequence) => x(sequence.data.year))
      .y0((sequence) => y(sequence[0]))
      .y1((sequence) => y(sequence[1]))
      .curve(curveCardinal);

    svg
      .selectAll('.layers')
      .data(layers)
      .join('path')
      .attr('class', 'layers')
      .attr('fill', (layer) => {
        return colors[layer.key];
      })
      .attr('d', areaGenerator);
  };

  useEffect(() => {
    if (!dimension) {
      return;
    }

    drawAreaChart();

    //eslint-disable-next-line
  }, [data, colors, keys, dimension]);
  return (
    <div ref={wrapperSvg} style={{ width: '100%', minHeight: '500px' }}>
      <svg
        ref={selectedSvg}
        style={{ width: '100%', minHeight: '500px', background: '#e5e5e5' }}
      ></svg>
    </div>
  );
};

export default StackAreaChart;
