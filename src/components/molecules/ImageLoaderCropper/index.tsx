import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../layouts';
import { ImageLoaderCropperProps } from './types';

const LazyImageLoaderCropper = lazy(() => import('./ImageLoaderCropper').then(module => ({ default: module.ImageLoaderCropper })));

export const ImageLoaderCropper = (props: ImageLoaderCropperProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyImageLoaderCropper {...props} />
  </Suspense>
);

export * from './types';
