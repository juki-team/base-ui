import React from 'react';

interface SquareFrameProps {
  strokeWidth?: number,
  cx?: number,
  cy?: number,
  sizeBox?: number,
  filled?: boolean,
}

export const SquareFrame = ({ strokeWidth = 2, sizeBox = 24, cy = 0, cx = 0, filled }: SquareFrameProps) => {
  return (
    <rect
      x={cx + strokeWidth / 2}
      y={cy + strokeWidth / 2}
      width={sizeBox - strokeWidth}
      height={sizeBox - strokeWidth}
      fill={filled ? 'currentColor' : 'none'}
      strokeWidth={strokeWidth}
      stroke="currentColor"
      rx={strokeWidth}
      ry={strokeWidth}
    />
  );
};
