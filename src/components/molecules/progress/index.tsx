import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { CircularProgressProps, MultiProgressBarProps } from './types';

const LazyComponent = lazy(() => import('./CircularProgress').then(module => ({ default: module.CircularProgress })));

export const CircularProgress = (props: CircularProgressProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyComponent {...props} />
  </Suspense>
);

const LazyComponent1 = lazy(() => import('./MultiProgressBar').then(module => ({ default: module.MultiProgressBar })));

export const MultiProgressBar = (props: MultiProgressBarProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyComponent1 {...props} />
  </Suspense>
);
