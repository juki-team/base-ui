import React, { CSSProperties } from 'react';

export const LineLoader = ({ delay = 5 }: { delay?: number }) => {
  return (
    <div className="layout-line-loader" style={{ '--delay': delay } as CSSProperties}>
      <div />
    </div>
  );
};
