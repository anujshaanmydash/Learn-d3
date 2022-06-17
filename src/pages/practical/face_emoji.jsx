import React from 'react';
import { range } from 'd3';
import Face from '../../components/face_emoji/Face';

const FaceEmoji = () => {
  const width = 160;
  const height = 160;

  const arr = range(6 * 4);
  console.log(arr);
  return (
    <div>
      {arr.map((index) => (
        <Face
          key={index}
          width={width}
          height={height}
          centerX={width / 2}
          centerY={height / 2}
          strokeWidth={6 + Math.random() * 3}
          eyeOffSetX={20 + Math.random() * 9}
          eyeOffSetY={20 + Math.random() * 15}
          eyeRadius={5 + Math.random() * 10}
          mouthWidth={7 + Math.random() * 9}
          mouthRadius={30 + Math.random() * 10}
        />
      ))}
    </div>
  );
};

export default FaceEmoji;
