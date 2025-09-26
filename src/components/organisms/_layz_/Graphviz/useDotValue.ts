import { read } from 'graphlib-dot';
import { useEffect, useState } from 'react';

export const useDotValue = (value: string) => {
  const [ error, setError ] = useState('');
  const [ dot, setDot ] = useState('graph {}');
  useEffect(() => {
    try {
      read(value);
      setDot(value);
      setError('');
    } catch (err: any) {
      setError(`Parse Error: ${err.message}`);
    }
  }, [ value ]);
  
  return {
    dot,
    error,
  };
};
