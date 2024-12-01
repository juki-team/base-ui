import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules/layouts/PawsLoadingLayout';
import { T } from '../T';
import { VirtualizedRowsFixedProps } from './types';

const LazyVirtualizedRowsFixed = lazy(() => import('./VirtualizedRowsFixed').then(module => ({ default: module.VirtualizedRowsFixed })));

export const VirtualizedRowsFixed = (props: VirtualizedRowsFixedProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyVirtualizedRowsFixed {...props} />
  </Suspense>
);
