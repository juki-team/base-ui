import React, { Fragment } from 'react';
import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType } from '../types';

export const renderReactNodeOrFunction = (content: ReactNodeOrFunctionType, key?: string | number) => {
  const reactNode = typeof content === 'function' ? content() : content;
  return key ? <Fragment key={key}>{reactNode}</Fragment> : reactNode;
};

export const renderReactNodeOrFunctionP1 = <T, >(content: ReactNodeOrFunctionP1Type<T>, prop1: T, key?: string | number) => {
  const reactNode = typeof content === 'function' ? content(prop1) : content;
  return key ? <Fragment key={key}>{reactNode}</Fragment> : reactNode;
};
