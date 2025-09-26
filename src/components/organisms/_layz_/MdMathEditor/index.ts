import { lazy } from 'react';

export const MdMathEditorImport = () => import('./MdMathEditor');

export const MdMathEditor = lazy(() => MdMathEditorImport());
