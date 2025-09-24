import { HTTPMethod, Status, UserHandlesType, WorksheetUserSubmissionsResponseDTO } from '@juki-team/commons';
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
import { KeyedMutator } from 'swr';
import { CLICK, ESCAPE, HOVER, NONE } from '../../constants';
import { Sound } from '../../enums';

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

export type RequestSortType = { [key: string]: 1 | -1 };

export type RequestFilterType = { [key: string]: string };

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

export type ReactNodeOrFunctionType = ReactNode | (() => ReactNode);

export type TriggerActionsType = typeof HOVER | typeof CLICK | typeof ESCAPE | typeof NONE;

export type TriggerOnActionsType = typeof HOVER | typeof CLICK | typeof NONE;

export type TriggerOffActionsType = typeof HOVER | typeof CLICK | typeof ESCAPE | typeof NONE;

export type BoundingClientRectType = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
  x: number,
  y: number
};

export type NotUndefined<T> = T extends undefined ? never : T;

export type SetStatusType = (status: Status) => void;

export type ViewPortSizeType = 'hg' | 'lg' | 'md' | 'sm' | '';

export type Sounds = { [key in Sound]: HTMLAudioElement };

export type DataViewerRequesterGetUrlType = (props: Omit<DataViewerRequestPropsType, 'setLoaderStatus'>) => string | null;

export type DateDisplayType =
  'year'
  | 'year-month'
  | 'year-month-day'
  | 'year-month-day-hours'
  | 'year-month-day-hours-minutes'
  | 'year-month-day-hours-minutes-seconds'
  | 'year-month-day-hours-minutes-seconds-milliseconds'
  | 'hours'
  | 'hours-minutes'
  | 'hours-minutes-seconds'
  | 'hours-minutes-seconds-milliseconds';

export type TimeDisplayType =
  'weeks'
  | 'weeks-days'
  | 'weeks-days-hours'
  | 'weeks-days-hours-minutes'
  | 'weeks-days-hours-minutes-seconds'
  | 'weeks-days-hours-minutes-seconds-milliseconds'
  | 'days'
  | 'days-hours'
  | 'days-hours-minutes'
  | 'days-hours-minutes-seconds'
  | 'days-hours-minutes-seconds-milliseconds'
  | 'hours'
  | 'hours-minutes'
  | 'hours-minutes-seconds'
  | 'hours-minutes-seconds-milliseconds'
  | 'minutes'
  | 'minutes-seconds'
  | 'minutes-seconds-milliseconds'
  | 'seconds'
  | 'seconds-milliseconds'
  | 'milliseconds';

export type UserResultsType = {
  data?: WorksheetUserSubmissionsResponseDTO,
  isLoading?: boolean,
  validating?: boolean,
  mutate?: KeyedMutator<any>,
}

export interface UpsertComponentEntityProps<EntityUI, Tab> {
  entity: EntityUI,
  entityKey: string,
  tabButtons: (props: { entityData: EntityUI, disableUpdateButton?: boolean }) => ReactNodeOrFunctionP1Type<{
    selectedTabKey?: Tab
  }>[],
}

export interface UpdatePasswordPayloadDTO {
  newPassword: string,
  oldPassword: string,
}

export interface SignInPayloadDTO {
  nickname: string,
  password: string,
  deviceName: string,
  osName: string,
}

export interface SignUpPayloadDTO {
  givenName: string,
  familyName: string,
  nickname: string,
  email: string,
  password: string,
}

export interface UpdateUserProfileDataPayloadDTO {
  nickname: string,
  givenName: string,
  familyName: string,
  aboutMe: string,
  country: string,
  city: string,
  institution: string,
  handles: UserHandlesType,
}

interface NextFetchRequestConfig {
  revalidate?: number | false,
  tags?: string[],
}

export interface AuthorizedRequestType<Method extends HTTPMethod = HTTPMethod.GET, > extends RequestInit {
  method: Method,
  body?: string | BodyInit,
  responseType?: 'text' | 'blob',
  token?: string,
  next?: NextFetchRequestConfig,
}

export type LoaderStatusType = Status;

export type SetLoaderStatusType = (status: (Status | ((props: LoaderStatusType) => LoaderStatusType))) => void;

export type ReloadType = () => void;
