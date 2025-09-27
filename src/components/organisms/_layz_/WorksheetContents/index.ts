import { lazy } from 'react';

export const WorksheetContentsImport = () => import('./WorksheetContents');

export const WorksheetContents = lazy(() => WorksheetContentsImport());
