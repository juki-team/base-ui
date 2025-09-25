import type { ReactNode } from 'react';
import { TabsType } from '../components/types';

export const oneTab: ((body: ReactNode) => TabsType) = (body: ReactNode) => {
  return {
    '*': {
      key: '*',
      header: '',
      body,
    },
  };
};
