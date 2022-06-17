import React from 'react';
import Eyes from './Eyes';
import FaceBackground from './FaceBackground';
import FaceContainer from './FaceContainer';
import Mouth from './Mouth';

const Face = ({
  width,
  height,
  centerX,
  centerY,
  strokeWidth,
  eyeOffSetX,
  eyeOffSetY,
  eyeRadius,
  mouthRadius,
  mouthWidth,
}) => {
  return (
    <FaceContainer
      width={width}
      height={height}
      centerX={centerX}
      centerY={centerY}
    >
      <FaceBackground centerY={centerY} strokeWidth={strokeWidth} />
      <Eyes
        eyeOffSetX={eyeOffSetX}
        eyeOffSetY={eyeOffSetY}
        eyeRadius={eyeRadius}
      />
      <Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth} />
    </FaceContainer>
  );
};

export default Face;
