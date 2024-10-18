import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules';
import { ProblemInfoProps, ProblemViewProps } from './types';

const LazyProblemView = lazy(() => import('./ProblemView').then(module => ({ default: module.ProblemView })));

export const ProblemView = <T, >(props: ProblemViewProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/* @ts-ignore*/}
    <LazyProblemView {...props} />
  </Suspense>
);

const LazyProblemInfo = lazy(() => import('./ProblemInfo').then(module => ({ default: module.ProblemInfo })));

export const ProblemInfo = (props: ProblemInfoProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyProblemInfo {...props} />
  </Suspense>
);
