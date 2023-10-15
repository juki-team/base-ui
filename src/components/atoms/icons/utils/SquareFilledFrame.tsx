import React from 'react';
import { arcS, H, M, V } from './functions';

export const SquareFilledFrame = () => { // width = 2
                                         // const  k = (2 - Math.sqrt(2)) / Math.sqrt(8);
  const k = 0.4;
  return (
    <path
      fill="currentColor"
      strokeWidth="0"
      stroke="currentColor"
      d={[
        M({ x: 2, y: 20 }),
        arcS({ x: 2, y: 20 }, { x: 4, y: 22 }, k),
        H(20),
        arcS({ x: 20, y: 22 }, { x: 22, y: 20 }, k),
        V(4),
        arcS({ x: 22, y: 4 }, { x: 20, y: 2 }, k),
        H(4),
        arcS({ x: 4, y: 2 }, { x: 2, y: 4 }, k),
        'Z',
      ].join(' ')}
    />
  );
};
