import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { DataGridProps } from './types';

const LazyDataGrid = lazy(() => import('./DataGrid').then(module => ({ default: module.DataGrid })));

export const DataGrid = (props: DataGridProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyDataGrid {...props} />
  </Suspense>
);

export * from './types';
