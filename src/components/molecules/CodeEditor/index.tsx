import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../layouts';
import { CodeEditorProps } from './types';

const LazyCodeEditor = lazy(() => import('./CodeEditor').then(module => ({ default: module.CodeEditor })));

export const CodeEditor = <T, >(props: CodeEditorProps<T>) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    {/*@ts-ignore*/}
    <LazyCodeEditor {...props} />
  </Suspense>
);

export * from './constants';
export * from './types';
