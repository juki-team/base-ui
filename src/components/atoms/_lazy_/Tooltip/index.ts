import { lazy } from 'react';

export const TooltipImport = () => import('./Tooltip');

export const Tooltip = lazy(() => TooltipImport());
