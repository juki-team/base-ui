import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server/icons/SpinIcon';
import type { WorksheetViewerProps } from './types';

export const WorksheetViewerImport = () => import('./WorksheetViewer');

const WorksheetViewerCmp = lazy(() => WorksheetViewerImport());

export const WorksheetViewer = (props: WorksheetViewerProps) => (
  <Suspense fallback={<SpinIcon />}>
    <WorksheetViewerCmp {...props} />
  </Suspense>
);
