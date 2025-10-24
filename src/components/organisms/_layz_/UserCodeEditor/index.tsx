import { FC, lazy, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { UserCodeEditorProps } from './types';

export const UserCodeEditorImport = () => import('./UserCodeEditor');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserCodeEditorGen = lazy(() => UserCodeEditorImport()) as FC<UserCodeEditorProps<any>>;

export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => (
  <Suspense fallback={<SpinIcon />}>
    <UserCodeEditorGen {...props} />
  </Suspense>
);
