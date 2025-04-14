import React, { lazy, Suspense } from 'react';
import { LoadingIcon } from './server';
import { ModalButtonLoaderEventType, ReactNodeOrFunctionType } from '../../types';
import { ButtonProps } from './Button/types';
import { CollapseProps } from './Collapse/types';
import { CopyToClipboardProps } from './CopyToClipboard/types';
import { DateLiteralProps } from './DateLiteral/types';
import { DivProps } from './Div/types';
import { ModalProps } from './Modal/types';
import { MultiSelectProps } from './MultiSelect/types';
import { PopoverProps } from './Popover/types';
import { PortalProps } from './Portal/types';
import { SelectProps } from './Select/types';
import { TProps } from './T/types';
import { TextAreaProps } from './TextArea/types';
import { VirtualizedRowsFixedProps } from './VirtualizedRowsFixed/types';
import { InputProps } from './inputs/types';
import { InputCellPhoneNumberProps } from './inputs/types';
import { InputCheckboxProps } from './inputs/types';
import { InputPasswordProps } from './inputs/types';
import { InputRadioProps } from './inputs/types';
import { InputSelectProps } from './inputs/types';
import { InputTextAreaProps } from './inputs/types';
import { InputToggleProps } from './inputs/types';

const LazyButton = lazy(() => import('./Button/Button').then(module => ({ default: module.Button })));
export const Button = (props: ButtonProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyButton {...props} />
  </Suspense>
);

const LazyCollapse = lazy(() => import('./Collapse/Collapse').then(module => ({ default: module.Collapse })));
export const Collapse = (props: CollapseProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyCollapse {...props} />
  </Suspense>
);

const LazyCopyToClipboard = lazy(() => import('./CopyToClipboard/CopyToClipboard').then(module => ({ default: module.CopyToClipboard })));
export const CopyToClipboard = (props: CopyToClipboardProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyCopyToClipboard {...props} />
  </Suspense>
);

const LazyDateLiteral = lazy(() => import('./DateLiteral/DateLiteral').then(module => ({ default: module.DateLiteral })));
export const DateLiteral = (props: DateLiteralProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyDateLiteral {...props} />
  </Suspense>
);

const LazyDiv = lazy(() => import('./Div/Div').then(module => ({ default: module.Div })));
export const Div = (props: DivProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyDiv {...props} />
  </Suspense>
);

const LazyModal = lazy(() => import('./Modal/Modal').then(module => ({ default: module.Modal })));
export const Modal = <T extends ModalButtonLoaderEventType = () => void>(props: ModalProps<T>) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyModal {...props} />
  </Suspense>
);

const LazyMultiSelect = lazy(() => import('./MultiSelect/MultiSelect').then(module => ({ default: module.MultiSelect })));
export const MultiSelect = <T, U extends React.ReactNode, V extends React.ReactNode>(props: MultiSelectProps<T, U, V>) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyMultiSelect {...props} />
  </Suspense>
);

const LazyPopover = lazy(() => import('./Popover/Popover').then(module => ({ default: module.Popover })));
export const Popover = (props: PopoverProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyPopover {...props} />
  </Suspense>
);

const LazyPortal = lazy(() => import('./Portal/Portal').then(module => ({ default: module.Portal })));
export const Portal = (props: PortalProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyPortal {...props} />
  </Suspense>
);

const LazySelect = lazy(() => import('./Select/Select').then(module => ({ default: module.Select })));
export const Select = <T, U extends React.ReactNode, V extends ReactNodeOrFunctionType>(props: SelectProps<T, U, V>) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazySelect {...props} />
  </Suspense>
);

const LazyT = lazy(() => import('./T/T').then(module => ({ default: module.T })));
export const T = (props: TProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyT {...props} />
  </Suspense>
);

const LazyTextArea = lazy(() => import('./TextArea/TextArea').then(module => ({ default: module.TextArea })));
export const TextArea = (props: TextAreaProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyTextArea {...props} />
  </Suspense>
);

const LazyVirtualizedRowsFixed = lazy(() => import('./VirtualizedRowsFixed/VirtualizedRowsFixed').then(module => ({ default: module.VirtualizedRowsFixed })));
export const VirtualizedRowsFixed = (props: VirtualizedRowsFixedProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyVirtualizedRowsFixed {...props} />
  </Suspense>
);

const LazyInput = lazy(() => import('./inputs/Input').then(module => ({ default: module.Input })));
export const Input = <T extends string | number | FileList, >(props: InputProps<T>) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyInput {...props} />
  </Suspense>
);

const LazyInputCellPhoneNumber = lazy(() => import('./inputs/InputCellPhoneNumber').then(module => ({ default: module.InputCellPhoneNumber })));
export const InputCellPhoneNumber = (props: InputCellPhoneNumberProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyInputCellPhoneNumber {...props} />
  </Suspense>
);

const LazyInputCheckbox = lazy(() => import('./inputs/InputCheckbox').then(module => ({ default: module.InputCheckbox })));
export const InputCheckbox = (props: InputCheckboxProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyInputCheckbox {...props} />
  </Suspense>
);

const LazyInputPassword = lazy(() => import('./inputs/InputPassword').then(module => ({ default: module.InputPassword })));
export const InputPassword = (props: InputPasswordProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyInputPassword {...props} />
  </Suspense>
);

const LazyInputRadio = lazy(() => import('./inputs/InputRadio').then(module => ({ default: module.InputRadio })));
export const InputRadio = (props: InputRadioProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyInputRadio {...props} />
  </Suspense>
);

const LazyInputSelect = lazy(() => import('./inputs/InputSelect').then(module => ({ default: module.InputSelect })));
export const InputSelect = <T, U extends React.ReactNode, V extends ReactNodeOrFunctionType>(props: InputSelectProps<T, U, V>) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyInputSelect {...props} />
  </Suspense>
);

const LazyInputTextArea = lazy(() => import('./inputs/InputTextArea').then(module => ({ default: module.InputTextArea })));
export const InputTextArea = (props: InputTextAreaProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyInputTextArea {...props} />
  </Suspense>
);

const LazyInputToggle = lazy(() => import('./inputs/InputToggle').then(module => ({ default: module.InputToggle })));
export const InputToggle = (props: InputToggleProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}>
    <LazyInputToggle {...props} />
  </Suspense>
);
