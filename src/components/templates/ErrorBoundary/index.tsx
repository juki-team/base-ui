import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../../atoms';
import { ErrorBoundaryProps } from './types';

const LazyErrorBoundary = lazy(() => import('./ErrorBoundary').then(module => ({ default: module.ErrorBoundary })));

export const ErrorBoundary = (props: ErrorBoundaryProps) => (
  <Suspense fallback={<SpinIcon />}>
    <LazyErrorBoundary {...props} />
  </Suspense>
);

export * from './types';
