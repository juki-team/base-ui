import React from 'react';
import { LoadingIcon } from '../icons';

export const LoaderLayer = ({ loading, children }: PropsWithChildren<LoaderLayerProps>) => {
  return loading ? <div className="jk-loader-layer"><LoadingIcon size="large" /></div> : <>{children}</>;
};

