import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../../molecules';
import { ProblemInfoProps, ProblemViewProps } from './types';

const LazyProblemView = lazy(() => import('./ProblemView').then(module => ({ default: module.ProblemView })));

export const ProblemView = <T, >(props: ProblemViewProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/* @ts-ignore*/}
    <LazyProblemView {...props} />
  </Suspense>
);

const LazyProblemInfo = lazy(() => import('./ProblemInfo').then(module => ({ default: module.ProblemInfo })));

export const ProblemInfo = (props: ProblemInfoProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyProblemInfo {...props} />
  </Suspense>
);
