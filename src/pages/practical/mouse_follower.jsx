import React, { useState } from 'react';

const MouseFollower = () => {
  const width = 1260;
  const height = 600;
  const initialMousePosition = { x: width / 2, y: height / 2 };
  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const circleRadius = 30;

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX - 160, y: clientY - 70 });
  };

  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle
        cx={mousePosition.x}
        cy={mousePosition.y}
        r={circleRadius}
        fill='aqua'
      />
    </svg>
  );
};

export default MouseFollower;
