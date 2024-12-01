import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { TabsInlineBodyProps, TabsInlineProps, TabsProps } from './types';

const LazyComponent = lazy(() => import('./Tabs').then(module => ({ default: module.Tabs })));

export const Tabs = <T extends string, >(props: TabsProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyComponent {...props} />
  </Suspense>
);

const LazyComponent2 = lazy(() => import('./TabsInline').then(module => ({ default: module.TabsInline })));

export const TabsInline = <T, >(props: TabsInlineProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyComponent2 {...props} />
  </Suspense>
);

const LazyComponent3 = lazy(() => import('./TabsInline').then(module => ({ default: module.TabsInlineBody })));

export const TabsInlineBody = <T, >(props: TabsInlineBodyProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyComponent3 {...props} />
  </Suspense>
);
