import { lazy } from 'react';

export const WorksheetAsSlidesImport = () => import('./WorksheetAsSlides');

export const WorksheetAsSlides = lazy(() => WorksheetAsSlidesImport());
