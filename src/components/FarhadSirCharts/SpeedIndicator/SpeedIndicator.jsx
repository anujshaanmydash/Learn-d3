import { arc, interpolate, pie, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import { useResizeObserver } from '../../../hooks/resizeObserver';

const SpeedIndicator = ({ speed }) => {
  const data = [speed, 100 - speed];

  const wrapperSvg = useRef(null);
  const selectedSvg = useRef(null);
  const dimension = useResizeObserver(wrapperSvg);

  const drawGaugeChart = () => {
    const svg = select(selectedSvg.current);

    svg.selectAll('*').remove();

    const arcGenerator = arc().innerRadius(125).outerRadius(190);

    const pieGenerator = pie()
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI)
      .sort(null);

    const instruction = pieGenerator(data);

    svg
      .selectAll('.slice')
      .data(instruction)
      .join('path')
      .attr('class', 'slice')
      .attr('fill', (instruction, index) =>
        index === 0 ? '#1AA7EC' : '#E5E5E5'
      )
      .style(
        'transform',
        `translate(${dimension.width / 2}px,${dimension.height / 2}px)`
      )
      .transition()
      .attrTween('d', function (nextInstruction) {
        const interpolator = interpolate(this.lastInstruction, nextInstruction);
        this.lastInstruction = interpolator(1);
        return function (t) {
          return arcGenerator(interpolator(t));
        };
      });
  };

  useEffect(() => {
    if (!dimension) return;

    drawGaugeChart();

    //eslint-disable-next-line
  }, [dimension, data]);

  return (
    <div ref={wrapperSvg}>
      <svg
        ref={selectedSvg}
        style={{ width: '100%', minHeight: '600px' }}
      ></svg>
    </div>
  );
};

export default SpeedIndicator;
