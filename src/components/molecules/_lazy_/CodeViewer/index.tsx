import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { CodeViewerProps } from './types';

export const CodeViewerImport = () => import('./CodeViewer');

const CodeViewerCmp = lazy(() => CodeViewerImport());

export const CodeViewer = (props: CodeViewerProps) => (
  <Suspense fallback={<SpinIcon />}>
    <CodeViewerCmp {...props} />
  </Suspense>
);
