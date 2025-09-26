import { lazy } from 'react';

export const ImageLoaderCropperImport = () => import('./ImageLoaderCropper');

export const ImageLoaderCropper = lazy(() => ImageLoaderCropperImport());
