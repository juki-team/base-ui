import { lazy } from 'react';

export const VirtualizedRowsFixedImport = () => import('./VirtualizedRowsFixed');

export const VirtualizedRowsFixed = lazy(() => VirtualizedRowsFixedImport());
