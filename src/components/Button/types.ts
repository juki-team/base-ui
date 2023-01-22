import { Status } from '@juki-team/commons';
import { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';

export type ButtonType = 'primary' | 'secondary' | 'outline' | 'text';
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
}

export type OnClickButtonEventType = { onClickEvent?: MouseEvent<HTMLButtonElement>, onKeyDownEvent?: KeyboardEvent<HTMLButtonElement> };

export interface ButtonProps extends ButtonBasicProps {
  onClick?: (props: OnClickButtonEventType) => void,
  // onClick?: () => void,
  loading?: boolean,
}

// export type ButtonLoaderOnClick = (setLoader: ButtonLoaderActionType, loader: ButtonLoaderStateType, event?: MouseEvent<HTMLButtonElement>) => void;
export type LoaderStatusOnClickType = [Status, number];
export type SetLoaderStatusOnClickType = (status: (Status | ((props: LoaderStatusOnClickType) => LoaderStatusOnClickType)), timestamp?: number) => void;
export type ButtonLoaderOnClickType = (setLoaderStatus: SetLoaderStatusOnClickType, loaderStatus: LoaderStatusOnClickType, event: OnClickButtonEventType) => void;

export interface ButtonLoaderProps extends ButtonBasicProps {
  setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void,
  onClick?: ButtonLoaderOnClickType,
}
