import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules/layouts/PawsLoadingLayout';
import { VirtualizedRowsFixedProps } from './types';

const LazyVirtualizedRowsFixed = lazy(() => import('./VirtualizedRowsFixed').then(module => ({ default: module.VirtualizedRowsFixed })));

export const VirtualizedRowsFixed = (props: VirtualizedRowsFixedProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/*@ts-ignore*/}
    <LazyVirtualizedRowsFixed {...props} />
  </Suspense>
);
