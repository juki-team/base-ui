import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { CodeViewerProps } from './types';

const LazyCodeViewer = lazy(() => import('./CodeViewer').then(module => ({ default: module.CodeViewer })));

export const CodeViewer = (props: CodeViewerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyCodeViewer {...props} />
  </Suspense>
);

export * from './types';
