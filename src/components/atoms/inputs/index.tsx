import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../molecules';
import { T } from '../T';
import { InputCellPhoneNumberProps } from './types';

const LazyInputCellPhoneNumber = lazy(() => import('./InputCellPhoneNumber').then(module => ({ default: module.InputCellPhoneNumber })));

export const InputCellPhoneNumber = (props: InputCellPhoneNumberProps<string>) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    {/*@ts-ignore*/}
    <LazyInputCellPhoneNumber {...props} />
  </Suspense>
);

export * from './Input';
export * from './InputCheckbox';
export * from './InputPassword';
export * from './InputRadio';
export * from './InputSelect';
export * from './InputTextArea';
export * from './InputToggle';
export * from './types';
