import React, { lazy, Suspense } from 'react';
import { JukiLoadingPLayout } from '../../molecules';
import { DataViewerProps } from './types';

const LazyDataViewer = lazy(() => import('./DataViewer').then(module => ({ default: module.DataViewer })));

export const DataViewer = <T extends { [key: string]: any }, >(props: DataViewerProps<T>) => (
  <Suspense fallback={<JukiLoadingPLayout />}>
    {/* @ts-ignore*/}
    <LazyDataViewer {...props} />
  </Suspense>
);

export * from './Fields';
export * from './constants';
export * from './types';
