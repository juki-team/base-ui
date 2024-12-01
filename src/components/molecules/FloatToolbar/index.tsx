import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { FloatToolbarProps } from './types';

const LazyFloatToolbar = lazy(() => import('./FloatToolbar').then(module => ({ default: module.FloatToolbar })));

export const FloatToolbar = (props: FloatToolbarProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyFloatToolbar {...props} />
  </Suspense>
);
