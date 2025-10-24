import { type FC, lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { CodeEditorProps } from './types';

export const CodeEditorImport = () => import('./CodeEditor');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeEditorCmp = lazy(() => CodeEditorImport()) as FC<CodeEditorProps<any>>;

export const CodeEditor = <T, >(props: CodeEditorProps<T>) => (
  <Suspense fallback={<SpinIcon />}>
    <CodeEditorCmp {...props} />
  </Suspense>
);
