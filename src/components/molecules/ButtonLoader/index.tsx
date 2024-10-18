import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../layouts';
import { ButtonLoaderProps } from './types';

const LazyButtonLoader = lazy(() => import('./ButtonLoader').then(module => ({ default: module.ButtonLoader })));

export const ButtonLoader = (props: ButtonLoaderProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyButtonLoader {...props} />
  </Suspense>
);

export * from './types';
