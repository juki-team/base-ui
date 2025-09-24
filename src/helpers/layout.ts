import type { ReactNode } from 'react';
import type { TabsType } from '../types';

export const oneTab: ((body: ReactNode) => TabsType) = (body: ReactNode) => {
  return {
    '*': {
      key: '*',
      header: '',
      body,
    },
  };
};
