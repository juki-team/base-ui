import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { SimpleSortableRowsProps } from './types';

const LazySimpleSortableRows = lazy(() => import('./SimpleSortableRows').then(module => ({ default: module.SimpleSortableRows })));

export const SimpleSortableRows = <T, U = undefined>(props: SimpleSortableRowsProps<T, U>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazySimpleSortableRows {...props} />
  </Suspense>
);
