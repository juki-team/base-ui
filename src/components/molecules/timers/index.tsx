import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { TimerLabeledProps, TimerProps } from './types';

const LazyComponent = lazy(() => import('./Timer').then(module => ({ default: module.Timer })));

export const Timer = (props: TimerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyComponent {...props} />
  </Suspense>
);

const LazyComponent2 = lazy(() => import('./TimerLabeled').then(module => ({ default: module.TimerLabeled })));

export const TimerLabeled = (props: TimerLabeledProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyComponent2 {...props} />
  </Suspense>
);
