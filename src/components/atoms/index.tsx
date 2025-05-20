import React, { lazy } from 'react';
import { SuspenseWithTracking } from '../SuspenseWithTracking';
import { SpinIcon } from './server/icons/SpinIcon';
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

const ButtonImport = () => import('./Button/Button');
const LazyButton = lazy(() => ButtonImport().then(module => ({ default: module.Button })));
export const Button = (props: ButtonProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Button">
    <LazyButton {...props} />
  </SuspenseWithTracking>
);

const CollapseImport = () => import('./Collapse/Collapse');
const LazyCollapse = lazy(() => CollapseImport().then(module => ({ default: module.Collapse })));
export const Collapse = (props: CollapseProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Collapse">
    <LazyCollapse {...props} />
  </SuspenseWithTracking>
);

const CopyToClipboardImport = () => import('./CopyToClipboard/CopyToClipboard');
const LazyCopyToClipboard = lazy(() => CopyToClipboardImport().then(module => ({ default: module.CopyToClipboard })));
export const CopyToClipboard = (props: CopyToClipboardProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CopyToClipboard">
    <LazyCopyToClipboard {...props} />
  </SuspenseWithTracking>
);

const DateLiteralImport = () => import('./DateLiteral/DateLiteral');
const LazyDateLiteral = lazy(() => DateLiteralImport().then(module => ({ default: module.DateLiteral })));
export const DateLiteral = (props: DateLiteralProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DateLiteral">
    <LazyDateLiteral {...props} />
  </SuspenseWithTracking>
);

const DivImport = () => import('./Div/Div');
const LazyDiv = lazy(() => DivImport().then(module => ({ default: module.Div })));
export const Div = (props: DivProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Div">
    <LazyDiv {...props} />
  </SuspenseWithTracking>
);

const ModalImport = () => import('./Modal/Modal');
const LazyModal = lazy(() => ModalImport().then(module => ({ default: module.Modal })));
export const Modal = <T extends ModalButtonLoaderEventType = () => void>(props: ModalProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Modal">
    {/*@ts-ignore*/}
    <LazyModal {...props} />
  </SuspenseWithTracking>
);

const MultiSelectImport = () => import('./MultiSelect/MultiSelect');
const LazyMultiSelect = lazy(() => MultiSelectImport().then(module => ({ default: module.MultiSelect })));
export const MultiSelect = <T, U extends React.ReactNode, V extends React.ReactNode>(props: MultiSelectProps<T, U, V>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MultiSelect">
    {/*@ts-ignore*/}
    <LazyMultiSelect {...props} />
  </SuspenseWithTracking>
);

const PopoverImport = () => import('./Popover/Popover');
const LazyPopover = lazy(() => PopoverImport().then(module => ({ default: module.Popover })));
export const Popover = (props: PopoverProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Popover">
    <LazyPopover {...props} />
  </SuspenseWithTracking>
);

const PortalImport = () => import('./Portal/Portal');
const LazyPortal = lazy(() => PortalImport().then(module => ({ default: module.Portal })));
export const Portal = (props: PortalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Portal">
    <LazyPortal {...props} />
  </SuspenseWithTracking>
);

const SelectImport = () => import('./Select/Select');
const LazySelect = lazy(() => SelectImport().then(module => ({ default: module.Select })));
export const Select = <T, U extends React.ReactNode, V extends ReactNodeOrFunctionType>(props: SelectProps<T, U, V>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Select">
    {/*@ts-ignore*/}
    <LazySelect {...props} />
  </SuspenseWithTracking>
);

const TImport = () => import('./T/T');
const LazyT = lazy(() => TImport().then(module => ({ default: module.T })));
export const T = (props: TProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="T">
    <LazyT {...props} />
  </SuspenseWithTracking>
);

const TextAreaImport = () => import('./TextArea/TextArea');
const LazyTextArea = lazy(() => TextAreaImport().then(module => ({ default: module.TextArea })));
export const TextArea = (props: TextAreaProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TextArea">
    <LazyTextArea {...props} />
  </SuspenseWithTracking>
);

const VirtualizedRowsFixedImport = () => import('./VirtualizedRowsFixed/VirtualizedRowsFixed');
const LazyVirtualizedRowsFixed = lazy(() => VirtualizedRowsFixedImport().then(module => ({ default: module.VirtualizedRowsFixed })));
export const VirtualizedRowsFixed = (props: VirtualizedRowsFixedProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="VirtualizedRowsFixed">
    <LazyVirtualizedRowsFixed {...props} />
  </SuspenseWithTracking>
);

const InputImport = () => import('./inputs/Input');
const LazyInput = lazy(() => InputImport().then(module => ({ default: module.Input })));
export const Input = <T extends string | number | FileList, >(props: InputProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Input">
    {/*@ts-ignore*/}
    <LazyInput {...props} />
  </SuspenseWithTracking>
);

const InputCellPhoneNumberImport = () => import('./inputs/InputCellPhoneNumber');
const LazyInputCellPhoneNumber = lazy(() => InputCellPhoneNumberImport().then(module => ({ default: module.InputCellPhoneNumber })));
export const InputCellPhoneNumber = (props: InputCellPhoneNumberProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InputCellPhoneNumber">
    <LazyInputCellPhoneNumber {...props} />
  </SuspenseWithTracking>
);

const InputCheckboxImport = () => import('./inputs/InputCheckbox');
const LazyInputCheckbox = lazy(() => InputCheckboxImport().then(module => ({ default: module.InputCheckbox })));
export const InputCheckbox = (props: InputCheckboxProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InputCheckbox">
    <LazyInputCheckbox {...props} />
  </SuspenseWithTracking>
);

const InputPasswordImport = () => import('./inputs/InputPassword');
const LazyInputPassword = lazy(() => InputPasswordImport().then(module => ({ default: module.InputPassword })));
export const InputPassword = (props: InputPasswordProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InputPassword">
    <LazyInputPassword {...props} />
  </SuspenseWithTracking>
);

const InputRadioImport = () => import('./inputs/InputRadio');
const LazyInputRadio = lazy(() => InputRadioImport().then(module => ({ default: module.InputRadio })));
export const InputRadio = (props: InputRadioProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InputRadio">
    <LazyInputRadio {...props} />
  </SuspenseWithTracking>
);

const InputSelectImport = () => import('./inputs/InputSelect');
const LazyInputSelect = lazy(() => InputSelectImport().then(module => ({ default: module.InputSelect })));
export const InputSelect = <T, U extends React.ReactNode, V extends ReactNodeOrFunctionType>(props: InputSelectProps<T, U, V>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InputSelect">
    {/*@ts-ignore*/}
    <LazyInputSelect {...props} />
  </SuspenseWithTracking>
);

const InputTextAreaImport = () => import('./inputs/InputTextArea');
const LazyInputTextArea = lazy(() => InputTextAreaImport().then(module => ({ default: module.InputTextArea })));
export const InputTextArea = (props: InputTextAreaProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InputTextArea">
    <LazyInputTextArea {...props} />
  </SuspenseWithTracking>
);

const InputToggleImport = () => import('./inputs/InputToggle');
const LazyInputToggle = lazy(() => InputToggleImport().then(module => ({ default: module.InputToggle })));
export const InputToggle = (props: InputToggleProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InputToggle">
    <LazyInputToggle {...props} />
  </SuspenseWithTracking>
);

export const preloadAtoms = async () => {
  await ButtonImport();
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
