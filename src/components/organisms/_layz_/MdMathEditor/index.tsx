import { forwardRef, lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { MdMathEditorHandle, MdMathEditorProps } from './types';

export const MdMathEditorImport = () => import('./MdMathEditor');

const MdMathEditorCmp = lazy(() => MdMathEditorImport());

export const MdMathEditor = forwardRef<MdMathEditorHandle, MdMathEditorProps>(function MdMathEditor(props, ref) {
  return (
    <Suspense fallback={<SpinIcon />}>
      <MdMathEditorCmp {...props} ref={ref} />
    </Suspense>
  );
});
