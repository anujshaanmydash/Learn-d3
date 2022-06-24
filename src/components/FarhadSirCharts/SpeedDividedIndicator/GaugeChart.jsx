import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Needle from './Needle';
import { useResizeObserver } from '../../../hooks/resizeObserver';
import { pie, scaleLinear, arc } from 'd3';

const GaugeChart = ({ speed, colorData }) => {
  const wrapperSvg = useRef(null);
  const selectedSvg = useRef(null);
  const dimension = useResizeObserver(wrapperSvg);

  const drawGaugeChart = () => {
    const chartWidth = dimension.width / 2;
    const chartHeight = dimension.height / 2;
    const radius = 170;
    const svg = d3.select(selectedSvg.current);

    svg.selectAll('*').remove();

    const Poor = scaleLinear().domain([0, 2.5]).range([0, 0.5]);

    const Developing = scaleLinear().domain([2.6, 3]).range([0.51, 0.6]);

    const Strong = scaleLinear().domain([3.1, 4]).range([0.61, 0.8]);

    const Excellent = scaleLinear().domain([4.1, 5]).range([0.81, 1]);

    const pieGenerator = pie()
      .value((d) => d.value)
      .startAngle((-1 * Math.PI) / 2)
      .endAngle(Math.PI / 2)
      .sort(null)(colorData);

    const g = svg
      .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`)
      .append('g')
      .attr(
        'transform',
        `translate(${chartWidth / 2},${chartHeight / 2 + 80})`
      );

    const arcGenerator = arc()
      .outerRadius(radius)
      .innerRadius(radius - 50)
      .padAngle(0.02);

    g.selectAll('path')
      .data(pieGenerator, (d) => d)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => colorData[i].color);

    const needle = new Needle({
      svg: svg,
      len: (chartHeight / 2) * 0.7,
      radius: (chartHeight / 3) * 0.15,
      x: chartWidth / 2,
      y: chartWidth / 2,
      group: g,
    });

    needle.render(0);

    if (speed < 50) needle.animateTo(Poor(speed));
    else if (speed < 60 && speed > 51) {
      needle.animateTo(Developing(speed));
    } else if (speed < 80 && speed > 60) {
      needle.animateTo(Strong(speed));
    } else if (speed < 100 && speed > 80) {
      needle.animateTo(Excellent(speed));
    }
  };

  useEffect(() => {
    if (!dimension) return;

    drawGaugeChart();
    // eslint-disable-next-line
  }, [speed, dimension]);

  return (
    <div ref={wrapperSvg} style={{ width: '100%', height: '600px' }}>
      <svg ref={selectedSvg} style={{ width: '100%', height: '400px' }}></svg>
    </div>
  );
};

export default GaugeChart;
