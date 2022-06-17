import React from 'react';

const FaceContainer = ({ children, width, height, centerX, centerY }) => {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>{children}</g>
    </svg>
  );
};

export default FaceContainer;
