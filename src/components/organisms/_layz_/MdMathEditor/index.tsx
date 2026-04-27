import { lazy, type Ref, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { MdMathEditorHandle, MdMathEditorProps } from './types';

export const MdMathEditorImport = () => import('./MdMathEditor');

const MdMathEditorCmp = lazy(() => MdMathEditorImport());

export function MdMathEditor(props: MdMathEditorProps & { ref?: Ref<MdMathEditorHandle> }) {
  const { ref, ...rest } = props;
  return (
    <Suspense fallback={<SpinIcon />}>
      <MdMathEditorCmp {...rest} ref={ref} />
    </Suspense>
  );
}
