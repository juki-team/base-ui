import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../server';

export const TooltipImport = () => import('./Tooltip');

const TooltipCmp = lazy(() => TooltipImport());

export const Tooltip = () => (
  <Suspense fallback={<SpinIcon />}>
    <TooltipCmp />
  </Suspense>
);
