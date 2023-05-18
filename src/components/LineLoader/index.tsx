import React, { CSSProperties, useState } from 'react';
import { useInterval } from '../../hooks';

export const LineLoader = ({ delay = 3000 }: { delay?: number }) => {
  
  const [ pos, setPos ] = useState(true);
  useInterval(() => setPos(prevState => !prevState), delay);
  
  return (
    <div className="layout-line-loader" style={{ '--delay': delay / 1000 } as CSSProperties}>
      <div className={pos ? ' loader-point-left-to-right' : ' loader-point-right-to-left'} />
    </div>
  );
};
