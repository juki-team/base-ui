import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { ImageLoaderCropperProps } from './types';

const LazyImageLoaderCropper = lazy(() => import('./ImageLoaderCropper').then(module => ({ default: module.ImageLoaderCropper })));

export const ImageLoaderCropper = (props: ImageLoaderCropperProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyImageLoaderCropper {...props} />
  </Suspense>
);

export * from './types';
