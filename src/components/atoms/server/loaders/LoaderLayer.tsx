import { type PropsWithChildren } from 'react';
import { SpinIcon } from '../icons';
import type { LoaderLayerProps } from './types';

export const LoaderLayer = ({ loading, children }: PropsWithChildren<LoaderLayerProps>) => {
  return loading ? <div className="jk-loader-layer"><SpinIcon size="large" /></div> : <>{children}</>;
};
