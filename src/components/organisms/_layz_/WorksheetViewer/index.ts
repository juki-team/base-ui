import { lazy } from 'react';

export const WorksheetViewerImport = () => import('./WorksheetViewer');

export const WorksheetViewer = lazy(() => WorksheetViewerImport());
