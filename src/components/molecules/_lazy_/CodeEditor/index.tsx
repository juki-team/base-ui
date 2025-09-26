import { type FC, lazy } from 'react';
import { CodeEditorProps } from './types';

export const CodeEditorImport = () => import('./CodeEditor');

const CodeEditorGen = lazy(() => CodeEditorImport()) as FC<CodeEditorProps<any>>;

export const CodeEditor = <T, >(props: CodeEditorProps<T>) => <CodeEditorGen {...props} />;
