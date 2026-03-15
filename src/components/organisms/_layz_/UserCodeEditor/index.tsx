import { forwardRef, lazy, ReactElement, Ref, RefAttributes, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server';
import type { UserCodeEditorHandle, UserCodeEditorProps } from './types';

export const UserCodeEditorImport = () => import('./UserCodeEditor');

const UserCodeEditorGen = lazy(() => UserCodeEditorImport()) as <T>(
  props: UserCodeEditorProps<T> & { ref?: Ref<UserCodeEditorHandle> },
) => ReactElement | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserCodeEditor = forwardRef<UserCodeEditorHandle, UserCodeEditorProps<any>>(function UserCodeEditor(props, ref) {
  return (
    <Suspense fallback={<SpinIcon />}>
      <UserCodeEditorGen {...props} ref={ref} />
    </Suspense>
  );
}) as <T>(props: UserCodeEditorProps<T> & RefAttributes<UserCodeEditorHandle>) => ReactElement | null;
