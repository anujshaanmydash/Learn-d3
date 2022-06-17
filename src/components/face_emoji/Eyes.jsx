import React from 'react';

const Eyes = ({ eyeOffSetX, eyeOffSetY, eyeRadius }) => {
  return (
    <>
      <circle cx={-eyeOffSetX} cy={-eyeOffSetY} r={eyeRadius} />
      <circle cx={eyeOffSetX} cy={-eyeOffSetY} r={eyeRadius} />
    </>
  );
};

export default Eyes;
