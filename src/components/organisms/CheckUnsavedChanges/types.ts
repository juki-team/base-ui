import { ReactElement } from 'react';

export interface CheckUnsavedChangesProps<T> {
  children: ReactElement,
  onClickContinue: () => void,
  value: T,
}
