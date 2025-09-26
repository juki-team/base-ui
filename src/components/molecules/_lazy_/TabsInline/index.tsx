import { type FC, lazy } from 'react';
import type { TabsInlineProps } from '../../Tabs/types';

export const TabsInlineImport = () => import('./TabsInline');

const TabsInlineGen = lazy(() => TabsInlineImport()) as FC<TabsInlineProps<any>>;

export const TabsInline = <T, >(props: TabsInlineProps<T>) => <TabsInlineGen {...props} />;
