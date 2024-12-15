import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { DrawerProps, DrawerViewProps } from './types';

const LazyDrawer = lazy(() => import('./Drawer').then(module => ({ default: module.Drawer })));

export const Drawer = (props: DrawerProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyDrawer {...props} />
  </Suspense>
);

const LazyDrawerView = lazy(() => import('./DrawerView').then(module => ({ default: module.DrawerView })));

export const DrawerView = (props: PropsWithChildren<DrawerViewProps>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyDrawerView {...props} />
  </Suspense>
);
