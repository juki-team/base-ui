import React from 'react';

export const SquareFrame = ({ width = 2 }: { width?: number }) => {
  return (
    <rect
      x={2 + width / 2}
      y={2 + width / 2}
      width={20 - width}
      height={20 - width}
      fill="none"
      strokeWidth={width}
      stroke="currentColor"
      rx={width / 4}
      ry={width / 4}
    />
  );
};
