import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server/icons/SpinIcon';
import type { WorksheetAsSlidesProps } from './types';

export const WorksheetAsSlidesImport = () => import('./WorksheetAsSlides');

const WorksheetAsSlidesCmp = lazy(() => WorksheetAsSlidesImport());

export const WorksheetAsSlides = (props: WorksheetAsSlidesProps) => (
  <Suspense fallback={<SpinIcon />}>
    <WorksheetAsSlidesCmp {...props} />
  </Suspense>
);
