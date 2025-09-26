import type { ReactNode } from 'react';
import { TabsType } from '../types';

export const oneTab: ((body: ReactNode) => TabsType) = (body: ReactNode) => {
  return {
    '*': {
      key: '*',
      header: '',
      body,
    },
  };
};
