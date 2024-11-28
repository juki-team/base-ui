import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules/layouts/PawsLoadingLayout';
import { PopoverProps } from './types';

const LazyPopover = lazy(() => import('./Popover').then(module => ({ default: module.Popover })));

export const Popover = (props: PopoverProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/*@ts-ignore*/}
    <LazyPopover {...props} />
  </Suspense>
);
