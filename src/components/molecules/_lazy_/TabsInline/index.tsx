import { type FC, lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { TabsInlineProps } from '../../Tabs/types';

export const TabsInlineImport = () => import('./TabsInline');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabsInlineGen = lazy(() => TabsInlineImport()) as FC<TabsInlineProps<any>>;

export const TabsInline = <T, >(props: TabsInlineProps<T>) => (
  <Suspense fallback={<SpinIcon />}>
    <TabsInlineGen {...props} />
  </Suspense>
);
