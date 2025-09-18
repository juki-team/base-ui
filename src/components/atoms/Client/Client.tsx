import React, { useEffect, useState } from 'react';
import { SpinIcon } from '../server';
import { ClientProps } from './types';

export const Client = ({ children }: ClientProps) => {
  const [ rendered, setRendered ] = useState(false);
  
  useEffect(() => {
    setRendered(true);
  }, []);
  
  return rendered ? children : <div className="jk-loader-layer"><SpinIcon /></div>;
};
