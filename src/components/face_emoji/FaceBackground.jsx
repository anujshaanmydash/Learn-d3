import React from 'react';

const FaceBackground = ({ centerY, strokeWidth }) => {
  return (
    <circle
      r={centerY - strokeWidth / 2}
      fill='yellow'
      stroke='black'
      strokeWidth={strokeWidth}
    />
  );
};

export default FaceBackground;
