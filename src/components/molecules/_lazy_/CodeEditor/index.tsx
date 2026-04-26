import { lazy, type ReactElement, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { CodeEditorProps } from './types';

export const CodeEditorImport = () => import('./CodeEditor');

const CodeEditorCmp = lazy(() => CodeEditorImport()) as <T>(props: CodeEditorProps<T>) => ReactElement | null;

export const CodeEditor = <T,>(props: CodeEditorProps<T>) => (
  <Suspense fallback={<SpinIcon />}>
    <CodeEditorCmp {...props} />
  </Suspense>
);
