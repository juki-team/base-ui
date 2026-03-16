import { forwardRef, lazy, ReactElement, Ref, RefAttributes, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { UserCodeEditorHandle, UserCodeEditorProps } from './types';

export const UserCodeEditorImport = () => import('./UserCodeEditor');

const UserCodeEditorGen = lazy(() => UserCodeEditorImport()) as <T>(
  props: UserCodeEditorProps<T> & { ref?: Ref<UserCodeEditorHandle<T>> },
) => ReactElement | null;

export const UserCodeEditor = forwardRef(function UserCodeEditor<T>(props: UserCodeEditorProps<T>, ref: Ref<UserCodeEditorHandle<T>>) {
  return (
    <Suspense fallback={<SpinIcon />}>
      <UserCodeEditorGen {...props} ref={ref} />
    </Suspense>
  );
}) as <T>(props: UserCodeEditorProps<T> & RefAttributes<UserCodeEditorHandle<T>>) => ReactElement | null;
