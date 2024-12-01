import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { CheckboxListProps } from './types';

const LazyCheckboxList = lazy(() => import('./CheckboxList').then(module => ({ default: module.CheckboxList })));

export const CheckboxList = <T, >(props: CheckboxListProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyCheckboxList {...props} />
  </Suspense>
);
