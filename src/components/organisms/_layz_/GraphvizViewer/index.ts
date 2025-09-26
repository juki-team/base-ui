import { lazy } from 'react';

export const GraphvizViewerImport = () => import('./GraphvizViewer');

export const GraphvizViewer = lazy(() => GraphvizViewerImport());
