import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { WorksheetContentsProps } from './types';

export const WorksheetContentsImport = () => import('./WorksheetContents');

const WorksheetContentsCmp = lazy(() => WorksheetContentsImport());

export const WorksheetContents = (props: WorksheetContentsProps) => (
  <Suspense fallback={<SpinIcon />}>
    <WorksheetContentsCmp {...props} />
  </Suspense>
);
