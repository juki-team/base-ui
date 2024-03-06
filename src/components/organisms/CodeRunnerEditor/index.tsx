import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../../atoms';
import { CodeRunnerEditorProps } from './types';

const LazyCodeRunnerEditor = lazy(() => import('./CodeRunnerEditor').then(module => ({ default: module.CodeRunnerEditor })));

export const CodeRunnerEditor = <T, >(props: CodeRunnerEditorProps<T>) => (
  <Suspense fallback={<SpinIcon />}>
    {/*@ts-ignore*/}
    <LazyCodeRunnerEditor {...props} />
  </Suspense>
);

export * from './types';
