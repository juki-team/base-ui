import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms/T';
import { JukiLoadingLayout } from './PawsLoadingLayout';
import { TwoContentLayoutProps } from './types';

// export * from './TwoContentCardsLayout';

const LazyTwoContentLayout = lazy(() => import('./TwoContentLayout').then(module => ({ default: module.TwoContentLayout })));

export const TwoContentLayout = <T, >(props: TwoContentLayoutProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyTwoContentLayout {...props} />
  </Suspense>
);

export * from './PawsLoadingLayout';
