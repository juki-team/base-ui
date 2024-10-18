import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../layouts';
import { SimpleSortableRowsProps } from './types';

const LazySimpleSortableRows = lazy(() => import('./SimpleSortableRows').then(module => ({ default: module.SimpleSortableRows })));

export const SimpleSortableRows = <T, U = undefined>(props: SimpleSortableRowsProps<T, U>) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/*@ts-ignore*/}
    <LazySimpleSortableRows {...props} />
  </Suspense>
);

export * from './types';
