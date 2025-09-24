import { Fragment, ReactNode } from 'react';
import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType } from '../types';

export const renderReactNodeOrFunction = (content: ReactNodeOrFunctionType, key?: string | number): ReactNode => {
  const reactNode = typeof content === 'function' ? content() : content;
  return typeof key !== 'undefined' ? <Fragment key={key}>{reactNode}</Fragment> : reactNode;
};

export const renderReactNodeOrFunctionP1 = <T, >(content: ReactNodeOrFunctionP1Type<T>, prop1: T, key?: string | number): ReactNode => {
  const reactNode = typeof content === 'function' ? content(prop1) : content;
  return typeof key !== 'undefined' ? <Fragment key={key}>{reactNode}</Fragment> : reactNode;
};
