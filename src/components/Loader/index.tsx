import React, { PropsWithChildren } from 'react';
import { LoadingIcon } from '../graphics';
import { LoaderLayerProps, LoaderProps } from './types';

export const Loader = ({ loading, component }: LoaderProps): JSX.Element => {
  return loading ? <LoadingIcon /> : component();
};

export const LoaderLayer = ({ loading, children }: PropsWithChildren<LoaderLayerProps>) => {
  return loading ? <div className="jk-loader-layer"><LoadingIcon size="large" /></div> : <>{children}</>;
};

export * from './types';
