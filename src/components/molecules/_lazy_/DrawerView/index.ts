import { lazy } from 'react';

export const DrawerViewImport = () => import('./DrawerView');

export const DrawerView = lazy(() => DrawerViewImport());
