import {
  axisBottom,
  axisLeft,
  max,
  scaleBand,
  scaleLinear,
  select,
  stack,
  stackOrderAscending,
} from 'd3';
import React, { useRef, useEffect } from 'react';
import { useResizeObserver } from '../hooks/resizeObserver';

const StackBar = ({ data, keys, colors }) => {
  const wrapperSvg = useRef();
  const selectedSvg = useRef();
  const dimension = useResizeObserver(wrapperSvg);

  const drawBarChart = () => {
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

    const x = scaleBand()
      .domain(data.map((d) => d.year))
      .range([10, width])
      .padding(0.4);

    const y = scaleLinear()
      .domain(extent)
      .range([height - 30, 20]);

    const xAxes = axisBottom(x);
    const yAxes = axisLeft(y);

    svg
      .append('g')
      .attr('class', '.x-axis')
      .attr('transform', `translate(20,${height - 30})`)
      .call(xAxes);

    svg
      .append('g')
      .attr('class', '.y-axis')
      .attr('transform', `translate(30,0)`)
      .call(yAxes);

    svg
      .selectAll('.layers')
      .data(layers)
      .join('g')
      .attr('class', 'layers')
      .attr('fill', (layer) => {
        return colors[layer.key];
      })
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('x', (sequence) => x(sequence.data.year) + 20)
      .attr('width', x.bandwidth())
      .attr('y', (sequence) => y(sequence[1]))
      .attr('height', (sequence) => y(sequence[0]) - y(sequence[1]));
  };

  useEffect(() => {
    if (!dimension) {
      return;
    }
    drawBarChart();

    //eslint-disable-next-line
  }, [dimension, data, keys, colors]);
  return (
    <div ref={wrapperSvg} style={{ width: '100%', minHeight: '450px' }}>
      <svg
        ref={selectedSvg}
        style={{ width: '100%', minHeight: '450px' }}
      ></svg>
    </div>
  );
};

export default StackBar;
