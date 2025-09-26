import { lazy } from 'react';

export const DataGridImport = () => import('./DataGrid');

export const DataGrid = lazy(() => DataGridImport());
