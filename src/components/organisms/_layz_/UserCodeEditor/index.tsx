import { lazy, type ReactElement, type Ref, Suspense } from 'react';
import { SpinIcon } from '../../../atoms/server/icons/SpinIcon';
import type { UserCodeEditorHandle, UserCodeEditorProps } from './types';

export const UserCodeEditorImport = () => import('./UserCodeEditor');

const UserCodeEditorGen = lazy(() => UserCodeEditorImport()) as <T>(
  props: UserCodeEditorProps<T> & { ref?: Ref<UserCodeEditorHandle<T>> },
) => ReactElement | null;

export function UserCodeEditor<T>(props: UserCodeEditorProps<T> & { ref?: Ref<UserCodeEditorHandle<T>> }) {
  const { ref, ...rest } = props;
  return (
    <Suspense fallback={<SpinIcon />}>
      <UserCodeEditorGen {...(rest as UserCodeEditorProps<T>)} ref={ref} />
    </Suspense>
  );
}
