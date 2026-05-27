import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../server/icons/SpinIcon';

export const TooltipImport = () => import('./Tooltip');

const TooltipCmp = lazy(() => TooltipImport());

export const Tooltip = () => (
  <Suspense fallback={<SpinIcon />}>
    <TooltipCmp />
  </Suspense>
);
