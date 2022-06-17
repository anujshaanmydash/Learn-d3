import React from 'react';
import { line } from 'd3';
import classes from '../../styles/barChart.module.scss';

const CircleLines = ({ data, yScale, xScale, yAccessor, xAccessor }) => {
  return (
    <>
      <path
        fill='none'
        stroke='blue'
        strokeWidth={2}
        d={line()
          .x((d) => xScale(xAccessor(d)))
          .y((d) => yScale(yAccessor(d)))(data)}
      />
      {data.map((d, index) => (
        <circle
          className={classes.circle}
          key={index}
          cx={xScale(xAccessor(d))}
          cy={yScale(yAccessor(d))}
          r={10}
        >
          {/* <title>{formatTick(xAccessor(d))}</title> */}
        </circle>
      ))}
    </>
  );
};

export default CircleLines;
