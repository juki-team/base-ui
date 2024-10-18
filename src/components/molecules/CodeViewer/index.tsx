import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../layouts';
import { CodeViewerProps } from './types';

const LazyCodeViewer = lazy(() => import('./CodeViewer').then(module => ({ default: module.CodeViewer })));

export const CodeViewer = (props: CodeViewerProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyCodeViewer {...props} />
  </Suspense>
);

export * from './types';
