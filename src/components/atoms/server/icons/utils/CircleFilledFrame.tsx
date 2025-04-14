import React from 'react';
import { CirclePath } from './CirclePath';

export const CircleFilledFrame = () => { // width = 2
  return <CirclePath center={{ x: 12, y: 12 }} radio={10} />;
  // return (
  //   <path
  //     // d="M (CX - R), CY      a R,R 0 1,0 (R * 2),0      a R,R 0 1,0 -(R * 2),0    "
  //     d="M 2, 12 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0"
  //   />
  // );
};
