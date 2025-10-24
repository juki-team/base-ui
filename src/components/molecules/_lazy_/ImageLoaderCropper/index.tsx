import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { ImageLoaderCropperProps } from './types';

export const ImageLoaderCropperImport = () => import('./ImageLoaderCropper');

const ImageLoaderCropperCmp = lazy(() => ImageLoaderCropperImport());

export const ImageLoaderCropper = (props: ImageLoaderCropperProps) => (
  <Suspense fallback={<SpinIcon />}>
    <ImageLoaderCropperCmp {...props} />
  </Suspense>
);
