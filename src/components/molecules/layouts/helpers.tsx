import { ReactNode } from 'react';

export const oneTab = (body: ReactNode) => {
  return {
    '': {
      key: '',
      header: '',
      body,
    },
  };
};
