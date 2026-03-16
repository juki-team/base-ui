import { lazy, ReactElement, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { DataViewerProps } from './types';

export const DataViewerImport = () => import('./DataViewer');

const DataViewerGen = lazy(() => DataViewerImport()) as <T extends object>(
  props: DataViewerProps<T>,
) => ReactElement | null;

export const DataViewer = <T extends object, >(props: DataViewerProps<T>) => (
  <Suspense fallback={<SpinIcon />}>
    <DataViewerGen {...props} />
  </Suspense>
);
