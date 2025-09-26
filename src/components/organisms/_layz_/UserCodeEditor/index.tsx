import { FC, lazy } from 'react';
import type { UserCodeEditorProps } from './types';

export const UserCodeEditorImport = () => import('./UserCodeEditor');

const UserCodeEditorGen = lazy(() => UserCodeEditorImport()) as FC<UserCodeEditorProps<any>>;

export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => <UserCodeEditorGen {...props} />;
