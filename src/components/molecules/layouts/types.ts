import { PropsWithChildren, ReactNode } from 'react';
import { Href } from '../../../contexts/JukiRouterProvider/types';
import { ReactNodeOrFunctionP1Type } from '../../../types';
import { TabsType } from '../Tabs';

export interface TwoContentLayoutProps<T> extends PropsWithChildren {
  breadcrumbs?: ReactNodeOrFunctionP1Type<{ selectedTabKey: T; }, ReactNode[]>,
  tabs?: TabsType<T>,
  tabButtons?: ReactNodeOrFunctionP1Type<{ selectedTabKey: T; }>[],
  getHrefOnTabChange?: (selectedTabKey: T) => Href,
  selectedTabKey?: T,
  loading?: boolean,
}
