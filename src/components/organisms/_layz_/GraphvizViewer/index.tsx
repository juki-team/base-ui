import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { GraphvizViewerProps } from './types';

export const GraphvizViewerImport = () => import('./GraphvizViewer');

const GraphvizViewerCmp = lazy(() => GraphvizViewerImport());

export const GraphvizViewer = (props: GraphvizViewerProps) => (
  <Suspense fallback={<SpinIcon />}>
    <GraphvizViewerCmp {...props} />
  </Suspense>
);
