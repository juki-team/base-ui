import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../../molecules';
import { ErrorBoundaryProps } from './types';

const LazyErrorBoundary = lazy(() => import('./ErrorBoundary').then(module => ({ default: module.ErrorBoundary })));

export const ErrorBoundary = (props: ErrorBoundaryProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyErrorBoundary {...props} />
  </Suspense>
);

export * from './types';
