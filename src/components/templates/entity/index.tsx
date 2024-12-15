import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../../molecules/layouts';
import { CreateEntityLayoutProps, UpdateEntityLayoutProps } from './types';

const LazyCreateEntityLayout = lazy(() => import('./CreateEntityLayout').then(module => ({ default: module.CreateEntityLayout })));

export const CreateEntityLayout = <T, U, V>(props: CreateEntityLayoutProps<T, U, V>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyCreateEntityLayout {...props} />
  </Suspense>
);

const LazyUpdateEntityLayout = lazy(() => import('./UpdateEntityLayout').then(module => ({ default: module.UpdateEntityLayout })));

export const UpdateEntityLayout = <T, U, V>(props: UpdateEntityLayoutProps<T, U, V>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyUpdateEntityLayout {...props} />
  </Suspense>
);

export * from './types';
