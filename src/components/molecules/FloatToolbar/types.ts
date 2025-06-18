import type { ReactNode } from 'react';
import { ButtonProps } from '../../atoms/Button/types';

export type ActionButtonType = {
  icon?: ReactNode,
  onClick?: (() => Promise<void>) | (() => void),
  label?: ReactNode,
  disabled?: boolean,
  size?: ButtonProps['size'],
  type?: ButtonProps['type'],
  children?: ReactNode,
};

export type ActionButtonsType = ActionButtonType[];

export interface ButtonActionProps {
  icon?: ReactNode,
  buttons?: ActionButtonsType,
  disabled?: boolean,
  children?: ReactNode,
  placement?: FloatToolbarProps['placement'],
  size?: ButtonProps['size'],
}

export interface FloatToolbarProps {
  actionButtons: ButtonActionProps[],
  placement?: 'leftBottom' | 'bottom' | 'rightBottom' | 'rightTop' | 'out rightTop' | 'top' | 'leftTop' | 'center' | 'center top' | 'center bottom',
}
