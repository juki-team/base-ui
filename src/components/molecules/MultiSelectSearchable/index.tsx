import React, { lazy, ReactNode, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { SelectSearchableProps } from './types';

const LazyMultiSelectSearchable = lazy(() => import('./MultiSelectSearchable').then(module => ({ default: module.MultiSelectSearchable })));

export const MultiSelectSearchable = <T, U extends ReactNode, V extends ReactNode>(props: SelectSearchableProps<T, U, V>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyMultiSelectSearchable {...props} />
  </Suspense>
);
