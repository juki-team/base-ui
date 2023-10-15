import React, { PropsWithChildren } from 'react';
import { LoadingIcon } from '../icons';
import { LoaderLayerProps } from './types';

export const LoaderLayer = ({ loading, children }: PropsWithChildren<LoaderLayerProps>) => {
  return loading ? <div className="jk-loader-layer"><LoadingIcon size="large" /></div> : <>{children}</>;
};
