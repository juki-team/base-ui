import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules';
import { DataViewerProps, PagedDataViewerProps } from './types';

const LazyDataViewer = lazy(() => import('./DataViewer').then(module => ({ default: module.DataViewer })));

export const DataViewer = <T extends { [key: string]: any }, >(props: DataViewerProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/* @ts-ignore*/}
    <LazyDataViewer {...props} />
  </Suspense>
);

const LazyPagedDataViewer = lazy(() => import('./PagedDataViewer').then(module => ({ default: module.PagedDataViewer })));

export const PagedDataViewer = <T, V>(props: PagedDataViewerProps<T, V>) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/* @ts-ignore*/}
    <LazyPagedDataViewer {...props} />
  </Suspense>
);

export * from './Fields';
export * from './constants';
export * from './types';
