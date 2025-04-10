import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { SimpleSortableRowsProps, SortableItemsProps } from './types';

const LazySimpleSortableRowsOld = lazy(() => import('./SimpleSortableRowsOld').then(module => ({ default: module.SimpleSortableRows })));

export const SimpleSortableRowsOld = <T, U = undefined>(props: SimpleSortableRowsProps<T, U>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazySimpleSortableRowsOld {...props} />
  </Suspense>
);

const LazySortableItems = lazy(() => import('./SortableItems').then(module => ({ default: module.SortableItems })));

export const SortableItems = <T, U = undefined>(props: SortableItemsProps<T, U>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazySortableItems {...props} />
  </Suspense>
);

export * from './types';
