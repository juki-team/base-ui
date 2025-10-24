import { FC, lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { DataViewerProps } from './types';

export const DataViewerImport = () => import('./DataViewer');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataViewerGen = lazy(() => DataViewerImport()) as FC<DataViewerProps<any>>;

export const DataViewer = <T, >(props: DataViewerProps<T>) => (
  <Suspense fallback={<SpinIcon />}>
    <DataViewerGen {...props} />
  </Suspense>
);
