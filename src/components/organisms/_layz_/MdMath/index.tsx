import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server/icons/SpinIcon';
import type { MdMathProps } from './types';

export const MdMathImport = () => import('./MdMath');

const MdMathCmp = lazy(() => MdMathImport());

export const MdMath = (props: MdMathProps) => (
  <Suspense fallback={<SpinIcon />}>
    <MdMathCmp {...props} />
  </Suspense>
);
