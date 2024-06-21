import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules';
import { ProblemViewProps } from './ProblemView';

const LazyProblemView = lazy(() => import('./ProblemView').then(module => ({ default: module.ProblemView })));

export const ProblemView = <T, >(props: ProblemViewProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/* @ts-ignore*/}
    <LazyProblemView {...props} />
  </Suspense>
);
