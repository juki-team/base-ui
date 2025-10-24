import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { WorksheetEditorProps } from './types';

export const WorksheetEditorImport = () => import('./WorksheetEditor');

const WorksheetEditorCmp = lazy(() => WorksheetEditorImport());

export const WorksheetEditor = (props: WorksheetEditorProps) => (
  <Suspense fallback={<SpinIcon />}>
    <WorksheetEditorCmp {...props} />
  </Suspense>
);
