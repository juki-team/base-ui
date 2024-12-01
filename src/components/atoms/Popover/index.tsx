import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules/layouts/PawsLoadingLayout';
import { T } from '../T';
import { PopoverProps } from './types';

const LazyPopover = lazy(() => import('./Popover').then(module => ({ default: module.Popover })));

export const Popover = (props: PopoverProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyPopover {...props} />
  </Suspense>
);
