import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SpeedIndicator = () => {
  const width = 1200;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const centerX = width / 2;
  const centerY = height / 2 + 60;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const needle = d3.select('#needle');
  const turnNeedle = () => {
    needle.transition().duration(2000).attrTween('transform', tween);
    function tween(d, i, a) {
      return d3.interpolateString('rotate(-90, 100, 30)', 'rotate(90,100,30)');
    }
  };

  const arc = d3
    .arc()
    .innerRadius(120)
    .outerRadius(230)
    .startAngle(-90 * (Math.PI / 180))
    .endAngle(90 * (Math.PI / 180));

  return (
    <svg
      width={width}
      height={height}
      style={{ background: '#424' }}
      onClick={turnNeedle}
    >
      <g transform={`translate(${centerX},${centerY})`}>
        <path d={arc()} fill='lightblue' />
        <g transform='translate(-200,0)'>
          <path
            id='needle'
            d='M108.5 186.5L0.5 0.5L139 166.5C141 196.5 119.5 192.333 108.5 186.5Z'
            fill='black'
            stroke='black'
            transform='rotate(-60)'
          />
        </g>
      </g>
    </svg>
  );
};

export default SpeedIndicator;
