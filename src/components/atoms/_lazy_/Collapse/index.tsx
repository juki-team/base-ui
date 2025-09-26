import { lazy } from 'react';

export const CollapseImport = () => import('./Collapse');

export const Collapse = lazy(() => CollapseImport());
