import { FC, lazy } from 'react';
import type { DataViewerProps } from './types';

export const DataViewerImport = () => import('./DataViewer');

const DataViewerGen = lazy(() => DataViewerImport()) as FC<DataViewerProps<any>>;

export const DataViewer = <T, >(props: DataViewerProps<T>) => <DataViewerGen {...props} />;
