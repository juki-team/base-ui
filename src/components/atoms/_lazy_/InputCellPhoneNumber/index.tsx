import { lazy, Suspense } from 'react';
import { SpinIcon } from '../../server';
import type { InputCellPhoneNumberProps } from './types';

export const InputCellPhoneNumberImport = () => import('./InputCellPhoneNumber');

const InputCellPhoneNumberCmp = lazy(() => InputCellPhoneNumberImport());

export const InputCellPhoneNumber = (props: InputCellPhoneNumberProps) => (
  <Suspense fallback={<SpinIcon />}>
    <InputCellPhoneNumberCmp {...props} />
  </Suspense>
);
