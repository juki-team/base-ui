import { ReactNode } from 'react';
import { TabsType } from '../components/molecules/Tabs/types';

export const oneTab: ((body: ReactNode) => TabsType) = (body: ReactNode) => {
  return {
    '*': {
      key: '*',
      header: '',
      body,
    },
  };
};
