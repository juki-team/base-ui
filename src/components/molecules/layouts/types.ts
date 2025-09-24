import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import type { Href } from '../../../contexts/JukiRouterProvider/types';
import { ReactNodeOrFunctionP1Type, TabsType } from '../../types';

type Full<T> = {
  [P in keyof T]-?: T[P];
}

export interface PawsLoadingLayoutProps extends PropsWithChildren <{
  sec?: number,
  size?: number,
  trace?: number,
  style?: CSSProperties,
}> {
}

export interface JukiLoadingLayoutProps extends PawsLoadingLayoutProps {
}

export interface PathLoadingPawsProps extends Full<Omit<PawsLoadingLayoutProps, 'style'>> {
  step: number,
  totalSteps: number,
  N: number,
  H: number,
  W: number,
  delay: number,
  animationName: string,
  bottom: number | string,
}

export interface TwoContentLayoutProps<T> extends PropsWithChildren <{
  breadcrumbs?: ReactNodeOrFunctionP1Type<{ selectedTabKey?: T; }, ReactNode[]>,
  tabs?: TabsType<T>,
  tabButtons?: ReactNodeOrFunctionP1Type<{ selectedTabKey?: T; }>[],
  getHrefOnTabChange?: (selectedTabKey: T) => Href,
  selectedTabKey?: T,
  loading?: boolean | ReactNode,
}> {
}

export interface TwoContentCardsLayoutProps<T> extends TwoContentLayoutProps<T> {
}
