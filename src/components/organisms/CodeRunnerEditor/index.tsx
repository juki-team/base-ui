import React, { lazy, Suspense } from 'react';
import { JukiLoadingPLayout } from '../../molecules';
import { CodeRunnerEditorProps } from './types';

const LazyCodeRunnerEditor = lazy(() => import('./CodeRunnerEditor').then(module => ({ default: module.CodeRunnerEditor })));

export const CodeRunnerEditor = <T, >(props: CodeRunnerEditorProps<T>) => (
  <Suspense fallback={<JukiLoadingPLayout />}>
    {/*@ts-ignore*/}
    <LazyCodeRunnerEditor {...props} />
  </Suspense>
);

export * from './types';
