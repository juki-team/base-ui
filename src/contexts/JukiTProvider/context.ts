import { createContext } from 'react';
import { TContextInterface } from './types';

export const TContext = createContext<TContextInterface>({
  t: (key) => key,
});
