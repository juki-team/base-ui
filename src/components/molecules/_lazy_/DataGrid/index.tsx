import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { DataGridProps } from './types';

export const DataGridImport = () => import('./DataGrid');

const DataGridCmp = lazy(() => DataGridImport());

export const DataGrid = (props: DataGridProps) => (
  <Suspense fallback={<SpinIcon />}>
    <DataGridCmp {...props} />
  </Suspense>
);
