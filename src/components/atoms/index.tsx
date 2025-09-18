import React, { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../SuspenseWithTracking';
import { SpinIcon } from './server/icons/SpinIcon';
import { ModalButtonLoaderEventType, ReactNodeOrFunctionType } from '../../types';
import { ButtonProps } from './Button/types';
import { ClientProps } from './Client/types';
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

const ButtonImport = () => import('./Button/Button');
const LazyButton = lazy(() => ButtonImport().then(module => ({ default: module.Button })));
export const Button = (props: ButtonProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyButton {...props} />
  </Suspense>
);

const ClientImport = () => import('./Client/Client');
const LazyClient = lazy(() => ClientImport().then(module => ({ default: module.Client })));
export const Client = (props: ClientProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyClient {...props} />
  </Suspense>
);

const CollapseImport = () => import('./Collapse/Collapse');
const LazyCollapse = lazy(() => CollapseImport().then(module => ({ default: module.Collapse })));
export const Collapse = (props: CollapseProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCollapse {...props} />
  </Suspense>
);

const CopyToClipboardImport = () => import('./CopyToClipboard/CopyToClipboard');
const LazyCopyToClipboard = lazy(() => CopyToClipboardImport().then(module => ({ default: module.CopyToClipboard })));
export const CopyToClipboard = (props: CopyToClipboardProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCopyToClipboard {...props} />
  </Suspense>
);

const DateLiteralImport = () => import('./DateLiteral/DateLiteral');
const LazyDateLiteral = lazy(() => DateLiteralImport().then(module => ({ default: module.DateLiteral })));
export const DateLiteral = (props: DateLiteralProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDateLiteral {...props} />
  </Suspense>
);

const DivImport = () => import('./Div/Div');
const LazyDiv = lazy(() => DivImport().then(module => ({ default: module.Div })));
export const Div = (props: DivProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDiv {...props} />
  </Suspense>
);

const ModalImport = () => import('./Modal/Modal');
const LazyModal = lazy(() => ModalImport().then(module => ({ default: module.Modal })));
export const Modal = <T extends ModalButtonLoaderEventType = () => void>(props: ModalProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyModal {...props} />
  </Suspense>
);

const MultiSelectImport = () => import('./MultiSelect/MultiSelect');
const LazyMultiSelect = lazy(() => MultiSelectImport().then(module => ({ default: module.MultiSelect })));
export const MultiSelect = <T, U extends React.ReactNode, V extends React.ReactNode>(props: MultiSelectProps<T, U, V>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyMultiSelect {...props} />
  </Suspense>
);

const PopoverImport = () => import('./Popover/Popover');
const LazyPopover = lazy(() => PopoverImport().then(module => ({ default: module.Popover })));
export const Popover = (props: PopoverProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPopover {...props} />
  </Suspense>
);

const PortalImport = () => import('./Portal/Portal');
const LazyPortal = lazy(() => PortalImport().then(module => ({ default: module.Portal })));
export const Portal = (props: PortalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPortal {...props} />
  </Suspense>
);

const SelectImport = () => import('./Select/Select');
const LazySelect = lazy(() => SelectImport().then(module => ({ default: module.Select })));
export const Select = <T, U extends React.ReactNode, V extends ReactNodeOrFunctionType>(props: SelectProps<T, U, V>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazySelect {...props} />
  </Suspense>
);

const TImport = () => import('./T/T');
const LazyT = lazy(() => TImport().then(module => ({ default: module.T })));
export const T = (props: TProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyT {...props} />
  </Suspense>
);

const TextAreaImport = () => import('./TextArea/TextArea');
const LazyTextArea = lazy(() => TextAreaImport().then(module => ({ default: module.TextArea })));
export const TextArea = (props: TextAreaProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTextArea {...props} />
  </Suspense>
);

const VirtualizedRowsFixedImport = () => import('./VirtualizedRowsFixed/VirtualizedRowsFixed');
const LazyVirtualizedRowsFixed = lazy(() => VirtualizedRowsFixedImport().then(module => ({ default: module.VirtualizedRowsFixed })));
export const VirtualizedRowsFixed = (props: VirtualizedRowsFixedProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVirtualizedRowsFixed {...props} />
  </Suspense>
);

const InputImport = () => import('./inputs/Input');
const LazyInput = lazy(() => InputImport().then(module => ({ default: module.Input })));
export const Input = <T extends string | number | FileList, >(props: InputProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyInput {...props} />
  </Suspense>
);

const InputCellPhoneNumberImport = () => import('./inputs/InputCellPhoneNumber');
const LazyInputCellPhoneNumber = lazy(() => InputCellPhoneNumberImport().then(module => ({ default: module.InputCellPhoneNumber })));
export const InputCellPhoneNumber = (props: InputCellPhoneNumberProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputCellPhoneNumber {...props} />
  </Suspense>
);

const InputCheckboxImport = () => import('./inputs/InputCheckbox');
const LazyInputCheckbox = lazy(() => InputCheckboxImport().then(module => ({ default: module.InputCheckbox })));
export const InputCheckbox = (props: InputCheckboxProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputCheckbox {...props} />
  </Suspense>
);

const InputPasswordImport = () => import('./inputs/InputPassword');
const LazyInputPassword = lazy(() => InputPasswordImport().then(module => ({ default: module.InputPassword })));
export const InputPassword = (props: InputPasswordProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputPassword {...props} />
  </Suspense>
);

const InputRadioImport = () => import('./inputs/InputRadio');
const LazyInputRadio = lazy(() => InputRadioImport().then(module => ({ default: module.InputRadio })));
export const InputRadio = (props: InputRadioProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputRadio {...props} />
  </Suspense>
);

const InputSelectImport = () => import('./inputs/InputSelect');
const LazyInputSelect = lazy(() => InputSelectImport().then(module => ({ default: module.InputSelect })));
export const InputSelect = <T, U extends React.ReactNode, V extends ReactNodeOrFunctionType>(props: InputSelectProps<T, U, V>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyInputSelect {...props} />
  </Suspense>
);

const InputTextAreaImport = () => import('./inputs/InputTextArea');
const LazyInputTextArea = lazy(() => InputTextAreaImport().then(module => ({ default: module.InputTextArea })));
export const InputTextArea = (props: InputTextAreaProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputTextArea {...props} />
  </Suspense>
);

const InputToggleImport = () => import('./inputs/InputToggle');
const LazyInputToggle = lazy(() => InputToggleImport().then(module => ({ default: module.InputToggle })));
export const InputToggle = (props: InputToggleProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputToggle {...props} />
  </Suspense>
);

export const preloadAtoms = async () => {
  await ButtonImport();
  await ClientImport();
  await CollapseImport();
  await CopyToClipboardImport();
  await DateLiteralImport();
  await DivImport();
  await ModalImport();
  await MultiSelectImport();
  await PopoverImport();
  await PortalImport();
  await SelectImport();
  await TImport();
  await TextAreaImport();
  await VirtualizedRowsFixedImport();
  await InputImport();
  await InputCellPhoneNumberImport();
  await InputCheckboxImport();
  await InputPasswordImport();
  await InputRadioImport();
  await InputSelectImport();
  await InputTextAreaImport();
  await InputToggleImport();
};
