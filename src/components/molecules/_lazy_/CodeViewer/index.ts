import { lazy } from 'react';

export const CodeViewerImport = () => import('./CodeViewer');

export const CodeViewer = lazy(() => CodeViewerImport());
