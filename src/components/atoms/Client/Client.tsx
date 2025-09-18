import { useEffect, useState } from 'react';
import { ClientProps } from './types';

export const Client = ({ children }: ClientProps) => {
  const [ rendered, setRendered ] = useState(false);
  
  useEffect(() => {
    setRendered(true);
  }, []);
  
  return rendered ? children : null;
};
