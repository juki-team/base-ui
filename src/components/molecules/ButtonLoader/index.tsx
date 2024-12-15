import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { ButtonLoaderProps } from './types';

const LazyButtonLoader = lazy(() => import('./ButtonLoader').then(module => ({ default: module.ButtonLoader })));

export const ButtonLoader = (props: ButtonLoaderProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyButtonLoader {...props} />
  </Suspense>
);
