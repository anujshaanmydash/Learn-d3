import React from 'react';
import { curveNatural, line } from 'd3';

const Lines = ({ data, yScale, xScale, yAccessor, xAccessor }) => {
  return (
    <>
      <path
        fill='none'
        stroke='blue'
        strokeWidth={2}
        strokeLinecap='round'
        d={line()
          .x((d) => xScale(xAccessor(d)))
          .y((d) => yScale(yAccessor(d)))
          .curve(curveNatural)(data)}
      />
    </>
  );
};

export default Lines;
