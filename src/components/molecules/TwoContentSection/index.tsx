import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { TwoContentSectionProps } from './types';

const LazyComponent = lazy(() => import('./TwoContentSection').then(module => ({ default: module.TwoContentSection })));

export const TwoContentSection = (props: TwoContentSectionProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyComponent {...props} />
  </Suspense>
);
