import { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';

export type ButtonType = 'primary' | 'secondary' | 'light' | 'text'; // 'outline';

export type ButtonSizeType = 'tiny' | 'small' | 'regular' | 'large' | 'huge';

export type ButtonBasicProps = {
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
}
