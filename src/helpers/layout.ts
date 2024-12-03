import { ReactNode } from 'react';
import { TabsType } from '../components/molecules/Tabs/types';

export const oneTab: ((body: ReactNode) => TabsType<string>) = (body: ReactNode) => {
  return {
    '*': {
      key: '*',
      header: '',
      body,
    },
  };
};
