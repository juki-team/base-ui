import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../server/icons/SpinIcon';
import type { PopoverProps } from './types';

export const PopoverImport = () => import('./Popover');

const PopoverCmp = lazy(() => PopoverImport());

export const Popover = (props: PopoverProps) => (
  <Suspense fallback={<SpinIcon />}>
    <PopoverCmp {...props} />
  </Suspense>
);
