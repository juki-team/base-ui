import React, { useState } from 'react';
import { useInterval } from '../../hooks';

export const LineLoader = () => {
  
  const [pos, setPos] = useState(true);
  useInterval(() => setPos(prevState => !prevState), 3000);
  
  return (
    <div className="layout-line-loader">
      <div className={pos ? ' loader-point-left-to-right' : ' loader-point-right-to-left'} />
    </div>
  );
};
