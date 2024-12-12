import { CSSProperties, KeyboardEvent as ReactKeyboardEvent, MouseEvent, ReactNode } from 'react';

export type ButtonType = 'primary' | 'secondary' | 'light' | 'text' | 'void'; // 'outline';

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
  responsiveMobile?: boolean,
}

export type OnClickButtonEventType = {
  onClickEvent?: MouseEvent<HTMLButtonElement>,
  onKeyDownEvent?: KeyboardEvent | ReactKeyboardEvent,
  fetcherLayerErrorEvent?: any,
};

export interface ButtonProps extends ButtonBasicProps {
  withIconTransition?: boolean,
  onClick?: (props: OnClickButtonEventType) => void,
}
