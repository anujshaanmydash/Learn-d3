import React from 'react';
import classes from '../../styles/barChart.module.scss';

const Circles = ({ data, yScale, xScale, yAccessor, xAccessor }) => {
  return (
    <>
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

export default Circles;
