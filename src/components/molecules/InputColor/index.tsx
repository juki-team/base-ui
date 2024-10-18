import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../layouts';
import { ColorPickerProps } from './types';

const LazyInputColor = lazy(() => import('./InputColor').then(module => ({ default: module.InputColor })));

export const InputColor = (props: ColorPickerProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyInputColor {...props} />
  </Suspense>
);

export * from './types';
