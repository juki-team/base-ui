import { lazy } from 'react';

export const InputCellPhoneNumberImport = () => import('./InputCellPhoneNumber');

export const InputCellPhoneNumber = lazy(() => InputCellPhoneNumberImport());
