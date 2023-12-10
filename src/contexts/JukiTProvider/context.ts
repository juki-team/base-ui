import type { i18n } from 'i18next';
import { createContext } from 'react';
import { TContextInterface } from './types';

export const TContext = createContext<TContextInterface>({
  i18n: { t: (key: string) => key, mocked: true } as unknown as i18n,
});
