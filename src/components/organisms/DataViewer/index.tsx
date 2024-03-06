import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../../atoms';
import { DataViewerProps } from './types';

const LazyDataViewer = lazy(() => import('./DataViewer').then(module => ({ default: module.DataViewer })));

export const DataViewer = <T extends { [key: string]: any }, >(props: DataViewerProps<T>) => (
  <Suspense fallback={<SpinIcon />}>
    {/* @ts-ignore*/}
    <LazyDataViewer {...props} />
  </Suspense>
);

export * from './Fields';
export * from './constants';
export * from './types';
