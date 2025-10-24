import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import { MdMathProps } from './types';

export const MdMathImport = () => import('./MdMath');

const MdMathCmp = lazy(() => MdMathImport());

export const MdMath = (props: MdMathProps) => (
  <Suspense fallback={<SpinIcon />}>
    <MdMathCmp {...props} />
  </Suspense>
);
