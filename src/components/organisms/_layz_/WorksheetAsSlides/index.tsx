import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { WorksheetAsSlidesProps } from './types';

export const WorksheetAsSlidesImport = () => import('./WorksheetAsSlides');

const WorksheetAsSlidesCmp = lazy(() => WorksheetAsSlidesImport());

export const WorksheetAsSlides = (props: WorksheetAsSlidesProps) => (
  <Suspense fallback={<SpinIcon />}>
    <WorksheetAsSlidesCmp {...props} />
  </Suspense>
);
