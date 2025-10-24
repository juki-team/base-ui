import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { MdMathEditorProps } from './types';

export const MdMathEditorImport = () => import('./MdMathEditor');

const MdMathEditorCmp = lazy(() => MdMathEditorImport());

export const MdMathEditor = (props: MdMathEditorProps) => (
  <Suspense fallback={<SpinIcon />}>
    <MdMathEditorCmp {...props} />
  </Suspense>
);
