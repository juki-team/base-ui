import React from 'react';

export const CircleFrame = ({ width = 2 }: { width?: number }) => {
  return <circle cx="12" cy="12" r={10 - width / 2} fill="none" strokeWidth={width} stroke="currentColor" />;
};
