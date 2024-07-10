import { PropsWithChildren, ReactNode } from 'react';
import { ReactNodeOrFunctionP1Type } from '../../../types';
import { TabsType } from '../Tabs';

export interface TwoContentLayoutProps<T> extends PropsWithChildren {
  breadcrumbs?: ReactNodeOrFunctionP1Type<{ selectedTabKey: T; }, ReactNode[]>,
  tabs?: TabsType<T>,
  tabButtons?: ReactNodeOrFunctionP1Type<{ selectedTabKey: T; }>[],
  getPathname?: (selectedTabKey: T) => string,
  selectedTabKey?: T,
  loading?: boolean,
}
