import { lazy } from 'react';

export const WorksheetEditorImport = () => import('./WorksheetEditor');

export const WorksheetEditor = lazy(() => WorksheetEditorImport());
