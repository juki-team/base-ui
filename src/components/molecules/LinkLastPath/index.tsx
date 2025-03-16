import React, { lazy, PropsWithChildren, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { LastPathProps } from './types';

const LazyLinkLastPath = lazy(() => import('./LinkLastPath').then(module => ({ default: module.LinkLastPath })));

export const LinkLastPath = <T extends string | number = string, >(props: PropsWithChildren<LastPathProps<T>>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazyLinkLastPath {...props} />
  </Suspense>
);
