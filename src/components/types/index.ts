import { Status } from '@juki-team/commons';
import type {
  CSSProperties,
  Dispatch,
  KeyboardEvent as ReactKeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { RequestFilterType, RequestSortType } from '../../types';

export type ReactNodeOrFunctionP1Type<T, U = ReactNode> = U | ((prop1: T) => U);

export type LoaderStatusOnClickType = Status;

export type SetLoaderStatusOnClickType = (status: (Status | ((props: LoaderStatusOnClickType) => LoaderStatusOnClickType))) => void;

export type TabType<T = string> = {
  header: ReactNodeOrFunctionP1Type<{ selectedTabKey?: T }>,
  disabled?: boolean,
  clickable?: boolean,
  body?: ReactNodeOrFunctionP1Type<{ selectedTabKey?: T }>,
  key: T,
};

export type TabsType<T = string> = { [key: string]: TabType<T> };

export type LoaderStatusActionType = Dispatch<SetStateAction<Status>>;

export type DataViewerRequestPropsType = {
  sort: RequestSortType,
  filter: RequestFilterType,
  pagination: { page: number, pageSize: number },
  setLoaderStatus: LoaderStatusActionType,
}

export type OnClickButtonEventType = {
  onClickEvent?: MouseEvent<HTMLButtonElement>,
  onKeyDownEvent?: KeyboardEvent | ReactKeyboardEvent,
  fetcherLayerErrorEvent?: any,
};

export type ButtonLoaderOnClickType<T = OnClickButtonEventType> =
  ((setLoaderStatus: SetLoaderStatusOnClickType, loaderStatus: LoaderStatusOnClickType, event: T) => void)
  | ((setLoaderStatus: SetLoaderStatusOnClickType, loaderStatus: LoaderStatusOnClickType, event: T) => Promise<void>);

export type ButtonType = 'primary' | 'secondary' | 'light' | 'text' | 'void'; // 'outline';

export type ButtonSizeType = 'tiny' | 'small' | 'regular' | 'large' | 'huge';

export type ButtonBasicProps = {
  type?: ButtonType,
  className?: string,
  children?: ReactNode,
  // Icon?: Icons,
  icon?: ReactNode,
  disabled?: boolean,
  expand?: boolean,
  submit?: boolean,
  size?: ButtonSizeType,
  style?: CSSProperties,
  responsiveMobile?: boolean,
  tooltipContent?: string,
}

export interface InputCommonsProps<T> {
  id?: string,
  onChange?: (newValue: T) => void,
  onFocus?: () => void,
  onBlur?: () => void,
  value?: T,
  name?: string,
  disabled?: boolean,
  // offline?: boolean
  className?: string,
  inputClassName?: string,
  labelClassName?: string,
  expand?: boolean,
  onClick?: MouseEventHandler<HTMLInputElement>,
  autoFocus?: boolean,
  placeholder?: string,
  register?: UseFormRegisterReturn | ((setValueAs: (value: T) => void) => UseFormRegisterReturn),  //{ name: string, onBlur: ChangeHandler, onChange: ChangeHandler, ref: any },
  // types
  type?: 'text' | 'number' | 'password' | 'email' | 'file' | 'files' | 'range' | 'color',
  accept?: string,
  size?: number | 'auto',
  step?: number | 'auto',
  label?: string | ReactNode, // TType,
  icon?: ReactNode,
  labelPlacement?: 'top-border' | 'top' | 'left',
  required?: boolean,
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
  onEnter?: KeyboardEventHandler<HTMLInputElement>,
  min?: number,
  max?: number,
  children?: ReactNode,
}
