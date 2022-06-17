import React from 'react';
import classes from '../../styles/barChart.module.scss';

const Bars = ({ data, yScale, xScale, yAccessor, xAccessor, formatTick }) => {
  return (
    <>
      {data.map((d, index) => (
        <rect
          className={classes.bars}
          key={index}
          x={0}
          y={yScale(yAccessor(d))}
          width={xScale(xAccessor(d))}
          height={yScale.bandwidth()}
        >
          <title>{formatTick(xAccessor(d))}</title>
        </rect>
      ))}
    </>
  );
};

export default Bars;
