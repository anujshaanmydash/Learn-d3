import { arc, interpolate, pie, scaleLinear, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import { useResizeObserver } from '../../../hooks/resizeObserver';
import Needle from '../SpeedDividedIndicator/Needle';

const GaugeChart = ({ speed }) => {
  const data = [speed, 100 - speed];

  const wrapperSvg = useRef(null);
  const selectedSvg = useRef(null);
  const dimension = useResizeObserver(wrapperSvg);
  const margin = { top: 20, left: 20, bottom: 20, right: 20 };

  const drawGaugeChart = () => {
    const chartWidth = dimension.width - margin.left - margin.right;
    const chartHeight = dimension.height - margin.top - margin.bottom;

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
      .style('transform', `translate(${chartWidth / 2}px,${chartHeight / 2}px)`)
      .transition()
      .attrTween('d', function (nextInstruction) {
        const interpolator = interpolate(this.lastInstruction, nextInstruction);
        this.lastInstruction = interpolator(1);
        return function (t) {
          return arcGenerator(interpolator(t));
        };
      });

    const g = svg
      .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`)
      .append('g')
      .attr('transform', `translate(${chartWidth / 2},${chartHeight / 2})`);

    console.log(data);
    const rotate = scaleLinear().domain([0, 100]).range([0, 1]);

    const needle = new Needle({
      svg: svg,
      len: (chartHeight / 2) * 0.4,
      radius: (chartHeight / 3) * 0.15,
      x: chartWidth / 2,
      y: chartWidth / 2,
      group: g,
    });

    needle.render(0);

    needle.animateTo(rotate(speed));
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

export default GaugeChart;
