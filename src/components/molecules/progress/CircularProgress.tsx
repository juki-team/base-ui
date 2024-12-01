import React, { CSSProperties } from 'react';
import { CircularProgressProps } from './types';

export const CircularProgress = ({ progress, size = 96 }: CircularProgressProps) => {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      className="jk-circular-progress"
      style={{ '--progress': progress, '--size': `${size}px`, '--stroke-width': `${size / 12}px` } as CSSProperties}
    >
      <circle className="bg"></circle>
      <circle className="fg"></circle>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">{progress} %</text>
    </svg>
  );
};
