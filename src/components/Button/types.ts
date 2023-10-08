import { Status } from '@juki-team/commons';
import { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';

export type ButtonType = 'primary' | 'secondary' | 'light' | 'outline' | 'text';
export type ButtonSizeType = 'tiny' | 'small' | 'regular' | 'large' | 'huge';

type ButtonBasicProps = {
  type?: ButtonType,
  className?: string,
  children?: ReactNode,
  // Icon?: Icons,
  icon?: ReactNode,
  disabled?: boolean,
  extend?: boolean,
  submit?: boolean,
  size?: ButtonSizeType,
  style?: CSSProperties,
  responsive?: boolean,
  responsiveMobile?: boolean,
}

export type OnClickButtonEventType = {
  onClickEvent?: MouseEvent<HTMLButtonElement>,
  onKeyDownEvent?: KeyboardEvent<HTMLButtonElement>,
  onRequestCloseModalEvent?: MouseEvent | KeyboardEvent,
  fetcherLayerErrorEvent?: any,
};

export interface ButtonProps extends ButtonBasicProps {
  withIconTransition?: boolean,
  onClick?: (props: OnClickButtonEventType) => void,
  loading?: boolean,
}

// export type ButtonLoaderOnClick = (setLoader: ButtonLoaderActionType, loader: ButtonLoaderStateType, event?: MouseEvent<HTMLButtonElement>) => void;
export type LoaderStatusOnClickType = [ Status, number ];
export type SetLoaderStatusOnClickType = (status: (Status | ((props: LoaderStatusOnClickType) => LoaderStatusOnClickType)), timestamp?: number) => void;
export type ButtonLoaderOnClickType =
  ((setLoaderStatus: SetLoaderStatusOnClickType, loaderStatus: LoaderStatusOnClickType, event: OnClickButtonEventType) => void)
  | ((setLoaderStatus: SetLoaderStatusOnClickType, loaderStatus: LoaderStatusOnClickType, event: OnClickButtonEventType) => Promise<void>);

export interface ButtonLoaderProps extends ButtonBasicProps {
  withIconTransition?: boolean,
  setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void,
  onClick?: ButtonLoaderOnClickType,
}
