import React from 'react';
import { CirclePath } from './CirclePath';

interface CircleFilledFrameProps {
  cx?: number,
  cy?: number,
  strokeWidth?: number,
  sizeBox?: number,
}

export const CircleFilledFrame = ({ cx = 12, cy = 12, sizeBox = 24, strokeWidth = 2 }: CircleFilledFrameProps) => { // width = 2
  return <CirclePath center={{ x: cx, y: cy }} radio={sizeBox / 2} />;
};
