import { ContentResponseType, ContentsResponseType } from '@juki-team/commons';
import React, { lazy, Suspense } from 'react';
import { T } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { FetcherLayerProps } from './types';

const LazyFetcherLayer = lazy(() => import('./FetcherLayer').then(module => ({ default: module.FetcherLayer })));

export const FetcherLayer = <T extends (ContentResponseType<U> | ContentsResponseType<U>), U = any>(props: FetcherLayerProps<T, U>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyFetcherLayer {...props} />
  </Suspense>
);
