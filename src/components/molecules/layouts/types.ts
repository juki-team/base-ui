import { PropsWithChildren, ReactNode } from 'react';
import { Href } from '../../../contexts/JukiRouterProvider/types';
import { ReactNodeOrFunctionP1Type } from '../../../types';
import { TabsType } from '../Tabs/types';

type Full<T> = {
  [P in keyof T]-?: T[P];
}

export interface PawsLoadingLayoutProps {
  sec?: number,
  size?: number,
  trace?: number
}

export interface PathLoadingPawsProps extends Full<PawsLoadingLayoutProps> {
  step: number,
  totalSteps: number,
  N: number,
  H: number,
  W: number,
  delay: number,
  animationName: string,
  bottom: number | string,
}

export interface TwoContentLayoutProps<T> extends PropsWithChildren {
  breadcrumbs?: ReactNodeOrFunctionP1Type<{ selectedTabKey: T; }, ReactNode[]>,
  tabs?: TabsType<T>,
  tabButtons?: ReactNodeOrFunctionP1Type<{ selectedTabKey: T; }>[],
  getHrefOnTabChange?: (selectedTabKey: T) => Href,
  selectedTabKey?: T,
  loading?: boolean | ReactNode,
}
