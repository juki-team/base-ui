import { lazy } from 'react';

export const MdMathImport = () => import('./MdMath');

export const MdMath = lazy(() => MdMathImport());
