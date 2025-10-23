import { useEffect, useState } from 'react';
import { SpinIcon } from '../server';
import type { ClientProps } from './types';

export function Client({ children }: ClientProps) {
  const [ rendered, setRendered ] = useState(false);
  
  useEffect(() => {
    setRendered(true);
  }, []);
  
  return rendered ? children : <div className="jk-loader-layer jk-overlay"><SpinIcon /></div>;
}
